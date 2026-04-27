"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import Underline from '@tiptap/extension-underline'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { SlashCommands, getSuggestionOptions } from './slash-commands'
import { Node, mergeAttributes } from '@tiptap/core'
import { Button } from "@/components/ui/button"
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter, Palette,
    List, ListOrdered, Quote,
    Link as LinkIcon, ImageIcon, Video, Code,
    Undo, Redo, Loader2, SquareDashedBottom, CheckSquare,
    Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, MessageSquare, AlertCircle, Minus, Plus, HelpCircle, MousePointerClick, Code2, Eye
} from "lucide-react"
import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { cn } from "@/lib/utils"
import { InternalLinkSelector } from './internal-link-selector'
import { AIAssistantModal } from './ai-assistant-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

// 1. Custom Paragraph allowing class attributes for styled subheadings
const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    if (!attributes.class) return {}
                    return { class: attributes.class }
                },
            },
        }
    },
})

// 2. Custom Block Nodes for Callouts and Dividers (Valid Divs)
const CalloutBlock = Node.create({
    name: 'calloutBlock',
    group: 'block',
    content: 'inline*',
    parseHTML() { return [{ tag: 'div[data-type="callout"]' }] },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'callout', class: 'bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-md my-6 text-orange-900 shadow-sm text-lg font-medium italic' }), 0]
    },
})

const InfoBox = Node.create({
    name: 'infoBox',
    group: 'block',
    content: 'inline*',
    parseHTML() { return [{ tag: 'div[data-type="info"]' }] },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'info', class: 'bg-slate-50 border border-slate-200 p-5 rounded-xl my-6 text-slate-800 text-sm font-medium' }), 0]
    },
})

const SectionDividerTitle = Node.create({
    name: 'sectionDividerTitle',
    group: 'block',
    content: 'inline*',
    parseHTML() { return [{ tag: 'div[data-type="divider-title"]' }] },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'divider-title', class: 'text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-6 mt-12' }), 0]
    },
})

const RawHTMLBlock = Node.create({
    name: 'rawHtmlBlock',
    group: 'block',
    content: 'text*',
    marks: '',
    code: true,
    defining: true,
    parseHTML() { return [{ tag: 'div[data-type="raw-html"]' }] },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'raw-html', class: 'bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-lg my-6 font-mono text-xs text-slate-500 relative before:content-["HTML_BLOCK"] before:absolute before:-top-2 before:left-2 before:bg-white before:px-1 before:text-[10px] before:font-bold before:text-slate-400' }), ['pre', ['code', 0]]]
    },
})


interface TiptapEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
    const [uploading, setUploading] = useState(false)
    const [viewMode, setViewMode] = useState<'visual' | 'html'>('visual')
    const [htmlContent, setHtmlContent] = useState(value)

    // Function to handle image upload for drag & drop and file picker
    const uploadImage = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed.')
            return null
        }

        // Client-side validation
        const MAX_SIZE = 500 * 1024; // 500KB
        if (file.size > MAX_SIZE) {
            toast.error('Image too large', {
                description: `Max size allowed for editor images is 500KB. Your image is ${(file.size / 1024).toFixed(2)}KB.`
            });
            return null;
        }

        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
        const filePath = `blog-images/${fileName}`

        try {
            const { error: uploadError } = await supabase.storage
                .from('blog-media')
                .upload(filePath, file, { upsert: false })

            if (uploadError) {
                if (uploadError.message.includes('maximum allowed size')) {
                    toast.error('Upload Failed', {
                        description: 'The image exceeds the server\'s storage limit. Please try a smaller image.'
                    });
                } else {
                    toast.error('Failed to upload image.', {
                        description: uploadError.message
                    });
                }
                return null;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('blog-media')
                .getPublicUrl(filePath)

            return publicUrl
        } catch (error: any) {
            console.error('Upload Error:', error)
            toast.error('Upload Error', {
                description: 'An unexpected error occurred while uploading.'
            })
            return null
        } finally {
            setUploading(false)
        }
    }

    const editor = useEditor({
        immediatelyRender: false,
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-[720px] mx-auto focus:outline-none min-h-[600px] py-12 font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:text-lg prose-a:text-orange-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:rounded-r-xl',
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                    const file = event.dataTransfer.files[0]
                    const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
                    
                    if (file.type.startsWith('image/')) {
                        event.preventDefault()
                        uploadImage(file).then((url) => {
                            if (url && coordinates) {
                                view.dispatch(view.state.tr.insert(coordinates.pos, view.state.schema.nodes.image.create({ src: url })))
                            }
                        })
                        return true
                    }
                }
                return false
            },
            handlePaste: (view, event, slice) => {
                if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
                    const file = event.clipboardData.files[0]
                    if (file.type.startsWith('image/')) {
                        event.preventDefault()
                        uploadImage(file).then((url) => {
                            if (url) {
                                view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src: url })))
                            }
                        })
                        return true
                    }
                }
                return false
            }
        },
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4, 5, 6] },
                paragraph: false,
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-orange-500 bg-orange-50/50 py-3 px-6 rounded-r-xl italic my-6 text-slate-700 text-xl',
                    },
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Type "/" for commands or start writing...',
                emptyEditorClass: 'is-editor-empty',
            }),
            CustomParagraph,
            CalloutBlock,
            InfoBox,
            SectionDividerTitle,
            RawHTMLBlock,
            Underline,
            Highlight,
            TextStyle,
            Color,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            SlashCommands.configure({
                suggestion: getSuggestionOptions(),
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'bg-slate-900 text-slate-50 p-4 rounded-xl my-4 font-mono text-sm overflow-x-auto shadow-inner',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl shadow-md max-w-full my-10 border border-slate-100',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-orange-600 underline hover:text-orange-800 transition-colors underline-offset-4',
                },
            }),
            Youtube.configure({
                controls: true,
                nocookie: true,
                HTMLAttributes: {
                    class: 'w-full aspect-video rounded-xl shadow-md my-10',
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setHtmlContent(html)
            onChange(html)
        },
    })

    const setLink = useCallback(() => {
        if (!editor) return
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) return

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    const setVideo = useCallback(() => {
        if (!editor) return
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            })
        }
    }, [editor])

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file || !editor) return

        const url = await uploadImage(file)
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
        
        if (event.target) event.target.value = ''
    }

    if (!editor) {
        return <div className="h-[400px] flex items-center justify-center border border-slate-200 rounded-lg"><Loader2 className="animate-spin text-slate-400" /></div>
    }

    const insertShortcode = (code: string) => {
        if (!editor) return;
        editor.chain().focus().insertContent(`[${code}]`).run();
    }

    const insertAiContent = (html: string) => {
        if (!editor) return;
        editor.chain().focus().insertContent(html).run();
    }

    const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlContent(e.target.value)
        onChange(e.target.value)
        if (editor) {
            editor.commands.setContent(e.target.value, { emitUpdate: false })
        }
    }

    return (
        <div className="relative flex flex-col w-full h-full bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            {/* Structured Sticky Toolbar */}
            <div className="sticky top-0 z-40 bg-white border-b border-slate-200 py-2 px-4 flex flex-wrap gap-1 items-center justify-between shadow-sm">
                
                <div className="flex flex-wrap gap-1 items-center">
                    <AIAssistantModal onInsert={insertAiContent} />
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 flex items-center gap-1.5 border-slate-200 text-slate-700 ml-1 shadow-sm hover:bg-slate-50">
                            <Plus className="w-3.5 h-3.5" /> <span className="font-semibold text-xs">Add Block</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl shadow-2xl border-slate-200/60 bg-white/95 backdrop-blur-md z-50">
                        <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1">Structure</DropdownMenuLabel>
                        
                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50">
                            <div className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center bg-white"><Heading2 className="w-4 h-4 text-slate-600" /></div>
                            <div><div className="text-sm font-semibold text-slate-800">Heading 2</div><div className="text-[10px] text-slate-500">Medium section heading</div></div>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50">
                            <div className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center bg-white"><Heading3 className="w-4 h-4 text-slate-600" /></div>
                            <div><div className="text-sm font-semibold text-slate-800">Heading 3</div><div className="text-[10px] text-slate-500">Small section heading</div></div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-slate-100 my-1" />
                        <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1">Components</DropdownMenuLabel>

                        <DropdownMenuItem onClick={() => editor.chain().focus().setNode('calloutBlock').run()} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-orange-50 focus:bg-orange-50">
                            <div className="w-8 h-8 rounded border border-orange-200 flex items-center justify-center bg-white"><AlertCircle className="w-4 h-4 text-orange-600" /></div>
                            <div><div className="text-sm font-semibold text-orange-900">Callout</div><div className="text-[10px] text-orange-700">Important highlight</div></div>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => editor.chain().focus().setNode('infoBox').run()} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50">
                            <div className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center bg-white"><MessageSquare className="w-4 h-4 text-slate-600" /></div>
                            <div><div className="text-sm font-semibold text-slate-800">Info Box</div><div className="text-[10px] text-slate-500">Neutral information block</div></div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-slate-100 my-1" />
                        <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1">Widgets</DropdownMenuLabel>

                        <DropdownMenuItem onClick={() => insertShortcode('faq_section')} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50">
                            <div className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center bg-white"><HelpCircle className="w-4 h-4 text-slate-600" /></div>
                            <div><div className="text-sm font-semibold text-slate-800">FAQ Section</div><div className="text-[10px] text-slate-500">Inject dynamic FAQs</div></div>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => insertShortcode('cta_button')} className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50">
                            <div className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center bg-white"><MousePointerClick className="w-4 h-4 text-slate-600" /></div>
                            <div><div className="text-sm font-semibold text-slate-800">CTA Button</div><div className="text-[10px] text-slate-500">Inject action button</div></div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-px h-5 bg-slate-200 mx-2" />

                {/* Text Formatting */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold"><Bold className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic"><Italic className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline"><UnderlineIcon className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough"><Strikethrough className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} title="Highlight"><Highlighter className="w-4 h-4" /></ToolbarButton>

                <div className="w-px h-5 bg-slate-200 mx-2" />

                {/* Lists & Quote */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List"><List className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered List"><ListOrdered className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} title="Task List"><CheckSquare className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote"><Quote className="w-4 h-4" /></ToolbarButton>

                <div className="w-px h-5 bg-slate-200 mx-2" />

                {/* Media & Links */}
                <InternalLinkSelector onSelectLink={(url) => editor.chain().focus().setLink({ href: url }).run()}>
                    <ToolbarButton isActive={editor.isActive('link')} title="Insert Internal Link"><LinkIcon className="w-4 h-4" /></ToolbarButton>
                </InternalLinkSelector>
                
                <div className="relative">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20" title="Upload Image" />
                    <ToolbarButton isActive={false} disabled={uploading} title="Upload Image">
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    </ToolbarButton>
                </div>

                <ToolbarButton onClick={setVideo} isActive={editor.isActive('youtube')} title="Embed YouTube Video"><Video className="w-4 h-4" /></ToolbarButton>

                <div className="w-px h-5 bg-slate-200 mx-2" />

                {/* Undo / Redo */}
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo className="w-4 h-4" /></ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo className="w-4 h-4" /></ToolbarButton>
                </div>

                {/* Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
                    <button 
                        onClick={() => setViewMode('visual')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'visual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Visual</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('html')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${viewMode === 'html' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> HTML</span>
                    </button>
                </div>
            </div>

            {/* Bubble Menu for selections */}
            <BubbleMenu editor={editor} className="flex items-center gap-0.5 bg-slate-900 text-white p-1.5 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-md">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={cn("p-2 hover:bg-slate-800 rounded-lg transition-colors", editor.isActive('bold') && "text-orange-400 bg-slate-800")}><Bold className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={cn("p-2 hover:bg-slate-800 rounded-lg transition-colors", editor.isActive('italic') && "text-orange-400 bg-slate-800")}><Italic className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={cn("p-2 hover:bg-slate-800 rounded-lg transition-colors", editor.isActive('underline') && "text-orange-400 bg-slate-800")}><UnderlineIcon className="w-4 h-4" /></button>
                <div className="w-px h-5 bg-slate-700 mx-1.5" />
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn("p-2 hover:bg-slate-800 rounded-lg transition-colors", editor.isActive('heading', { level: 2 }) && "text-orange-400 bg-slate-800")}><span className="text-xs font-black">H2</span></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={cn("p-2 hover:bg-slate-800 rounded-lg transition-colors", editor.isActive('heading', { level: 3 }) && "text-orange-400 bg-slate-800")}><span className="text-xs font-black">H3</span></button>
                <div className="w-px h-5 bg-slate-700 mx-1.5" />
                <button onClick={setLink} className={cn("p-2 hover:bg-slate-800 rounded-lg transition-colors", editor.isActive('link') && "text-orange-400 bg-slate-800")}><LinkIcon className="w-4 h-4" /></button>
            </BubbleMenu>

            {/* Editor Area */}
            <div className="w-full cursor-text bg-white flex-1 overflow-y-auto">
                {viewMode === 'visual' ? (
                    <div className="w-full max-w-[760px] mx-auto min-h-[600px] px-8 py-12 pb-32" onClick={() => editor.commands.focus()}>
                        <EditorContent editor={editor} className="w-full h-full" />
                    </div>
                ) : (
                    <div className="w-full h-full min-h-[600px] bg-slate-900 p-6">
                        <textarea 
                            value={htmlContent}
                            onChange={handleHtmlChange}
                            className="w-full h-full min-h-[600px] bg-transparent text-slate-300 font-mono text-sm leading-relaxed focus:outline-none resize-none"
                            spellCheck={false}
                        />
                    </div>
                )}
            </div>

            <style>{`
                .tiptap p.is-editor-empty:first-child::before {
                    color: #94a3b8;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                    font-size: 1.125rem;
                    font-weight: 400;
                    opacity: 0.8;
                    transition: opacity 0.2s ease-in-out;
                }
                .tiptap > * {
                    margin-top: 0.75em;
                    margin-bottom: 0.75em;
                    padding: 2px 4px;
                    margin-left: -4px;
                    margin-right: -4px;
                    border-radius: 4px;
                    transition: background-color 0.15s ease;
                }
                .tiptap > *:hover {
                    background-color: #f8fafc;
                }
                .tiptap img {
                    border-radius: 12px;
                    margin: 2em auto;
                }
                .tiptap table {
                    border-collapse: collapse;
                    table-layout: fixed;
                    width: 100%;
                    margin: 2rem 0;
                    overflow: hidden;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }
                .tiptap td, .tiptap th {
                    min-width: 1em;
                    border: 1px solid #e2e8f0;
                    padding: 0.75rem;
                    vertical-align: top;
                    box-sizing: border-box;
                    position: relative;
                }
                .tiptap th {
                    font-weight: 600;
                    text-align: left;
                    background-color: #f8fafc;
                }
                .tiptap ul[data-type="taskList"] {
                    list-style: none;
                    padding: 0;
                }
                .tiptap ul[data-type="taskList"] li {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            `}</style>
        </div>
    )
}

function ToolbarButton({ 
    children, 
    onClick, 
    isActive = false, 
    disabled = false,
    title
}: { 
    children: React.ReactNode
    onClick?: () => void
    isActive?: boolean
    disabled?: boolean
    title?: string
}) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`h-9 w-9 p-0 rounded-lg flex items-center justify-center transition-colors ${
                isActive 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
        >
            {children}
        </Button>
    )
}
