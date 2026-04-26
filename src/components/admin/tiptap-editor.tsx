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
import { Node, mergeAttributes } from '@tiptap/core'
import { Button } from "@/components/ui/button"
import {
    Bold, Italic, Underline as UnderlineIcon,
    List, ListOrdered, Quote,
    Link as LinkIcon, ImageIcon, Video, Code,
    Undo, Redo, Loader2, SquareDashedBottom
} from "lucide-react"
import { useCallback, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { cn } from "@/lib/utils"
import { InternalLinkSelector } from './internal-link-selector'
import { AIAssistantModal } from './ai-assistant-modal'

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
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'callout', class: 'bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md my-6 text-blue-900 shadow-sm text-lg font-medium' }), 0]
    },
})

const InfoBox = Node.create({
    name: 'infoBox',
    group: 'block',
    content: 'inline*',
    parseHTML() { return [{ tag: 'div[data-type="info"]' }] },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'info', class: 'bg-amber-50 border border-amber-200 p-4 rounded-md my-6 text-amber-900 text-sm font-medium' }), 0]
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
                class: 'prose prose-lg max-w-[720px] mx-auto focus:outline-none min-h-[600px] py-12 font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-h1:text-[36px] prose-h2:text-[30px] prose-h3:text-[24px] prose-h4:text-[20px] prose-h5:text-[18px] prose-h6:text-[16px] prose-p:text-slate-700 prose-p:leading-[1.75] prose-p:text-[18px] prose-a:text-orange-600 prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic',
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
                        class: 'border-l-4 border-orange-500 bg-slate-50 py-2 px-6 rounded-r-lg italic my-6',
                    },
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start writing your article...',
                emptyEditorClass: 'is-editor-empty',
            }),
            CustomParagraph,
            CalloutBlock,
            InfoBox,
            SectionDividerTitle,
            RawHTMLBlock,
            Underline,
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'bg-slate-900 text-slate-50 p-4 rounded-xl my-4 font-mono text-sm overflow-x-auto shadow-inner',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl shadow-md max-w-full my-10',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-orange-600 underline hover:text-orange-800 transition-colors',
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
            onChange(editor.getHTML())
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

    // Determine current block type for dropdown
    const getCurrentNodeType = () => {
        if (editor.isActive('heading', { level: 1 })) return 'h1';
        if (editor.isActive('heading', { level: 2 })) return 'h2';
        if (editor.isActive('heading', { level: 3 })) return 'h3';
        if (editor.isActive('heading', { level: 4 })) return 'h4';
        if (editor.isActive('heading', { level: 5 })) return 'h5';
        if (editor.isActive('heading', { level: 6 })) return 'h6';
        if (editor.isActive('calloutBlock')) return 'callout';
        if (editor.isActive('infoBox')) return 'info';
        if (editor.isActive('sectionDividerTitle')) return 'divider';
        if (editor.isActive('paragraph')) {
            const attrs = editor.getAttributes('paragraph');
            if (attrs.class === 'text-2xl font-semibold text-slate-800 mt-8 mb-4 leading-tight') return 'sub-large';
            if (attrs.class === 'text-xl font-medium text-slate-700 mt-6 mb-3') return 'sub-medium';
            if (attrs.class === 'text-lg font-medium text-slate-600 mt-4 mb-2 uppercase tracking-wide') return 'sub-small';
            return 'p';
        }
        return 'p';
    }

    const handleNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        
        // Block-level changes apply to the current block (separated by 'Enter').
        if (val === 'p') editor.chain().focus().setParagraph().run();
        else if (val.startsWith('h')) editor.chain().focus().toggleHeading({ level: parseInt(val[1]) as any }).run();
        else if (val === 'sub-large') editor.chain().focus().setNode('paragraph', { class: 'text-2xl font-semibold text-slate-800 mt-8 mb-4 leading-tight' }).run();
        else if (val === 'sub-medium') editor.chain().focus().setNode('paragraph', { class: 'text-xl font-medium text-slate-700 mt-6 mb-3' }).run();
        else if (val === 'sub-small') editor.chain().focus().setNode('paragraph', { class: 'text-lg font-medium text-slate-600 mt-4 mb-2 uppercase tracking-wide' }).run();
        else if (val === 'callout') editor.chain().focus().setNode('calloutBlock').run();
        else if (val === 'info') editor.chain().focus().setNode('infoBox').run();
        else if (val === 'raw-html') editor.chain().focus().setNode('rawHtmlBlock').run();
    }

    const insertShortcode = () => {
        if (!editor) return;
        editor.chain().focus().insertContent('[contact-form]').run();
    }

    const insertAiContent = (html: string) => {
        if (!editor) return;
        editor.chain().focus().insertContent(html).run();
    }

    return (
        <div className="relative flex flex-col w-full">
            {/* Structured Sticky Toolbar */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-2 px-4 flex flex-wrap gap-1 items-center">
                
                <AIAssistantModal onInsert={insertAiContent} />
                <div className="w-px h-5 bg-slate-200 mx-1.5" />

                {/* Node Selector Dropdown */}
                <select
                    className="h-8 border border-slate-200 bg-white text-sm px-2.5 text-slate-700 outline-none focus:ring-1 focus:ring-slate-300 w-40 cursor-pointer font-medium rounded-md transition-colors"
                    onChange={handleNodeChange}
                    value={getCurrentNodeType()}
                >
                    <option value="p">Normal Text</option>
                    <optgroup label="Headings">
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
                    </optgroup>
                    <optgroup label="Subheadings">
                        <option value="sub-large">Subheading Large</option>
                        <option value="sub-medium">Subheading Medium</option>
                        <option value="sub-small">Subheading Small</option>
                    </optgroup>
                    <optgroup label="Custom Blocks">
                        <option value="callout">Callout Highlight</option>
                        <option value="info">Info Box</option>
                        <option value="divider">Section Divider</option>
                        <option value="raw-html">Raw HTML Block</option>
                    </optgroup>
                </select>

                <div className="w-px h-5 bg-slate-200 mx-1.5" />

                {/* Text Formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Underline"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-slate-200 mx-1.5" />

                {/* Lists & Quote */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <Quote className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-slate-200 mx-1.5" />

                {/* Media & Links */}
                <InternalLinkSelector onSelectLink={(url) => editor.chain().focus().setLink({ href: url }).run()}>
                    <ToolbarButton isActive={editor.isActive('link')} title="Insert Internal Link">
                        <LinkIcon className="w-4 h-4" />
                    </ToolbarButton>
                </InternalLinkSelector>
                
                <div className="relative">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
                        title="Upload Image"
                    />
                    <ToolbarButton isActive={false} disabled={uploading} title="Upload Image">
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    </ToolbarButton>
                </div>

                <ToolbarButton onClick={setVideo} isActive={editor.isActive('youtube')} title="Embed YouTube Video">
                    <Video className="w-4 h-4" />
                </ToolbarButton>

                <div className="w-px h-5 bg-slate-200 mx-1.5" />

                {/* Code & Shortcodes */}
                <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Insert Code/HTML Block">
                    <Code className="w-4 h-4" />
                </ToolbarButton>

                <ToolbarButton onClick={insertShortcode} title="Insert Contact Form Shortcode">
                    <SquareDashedBottom className="w-4 h-4" />
                </ToolbarButton>

                <div className="flex-1" />

                {/* Undo / Redo */}
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
                    <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
                    <Redo className="w-4 h-4" />
                </ToolbarButton>
            </div>

            {/* Bubble Menu for selections */}
            <BubbleMenu editor={editor} className="flex items-center gap-0.5 bg-slate-900 text-white p-1 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn("p-1.5 hover:bg-slate-800 rounded transition-colors", editor.isActive('bold') && "text-orange-400 bg-slate-800")}
                    title="Bold"
                >
                    <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn("p-1.5 hover:bg-slate-800 rounded transition-colors", editor.isActive('italic') && "text-orange-400 bg-slate-800")}
                    title="Italic"
                >
                    <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={cn("p-1.5 hover:bg-slate-800 rounded transition-colors", editor.isActive('underline') && "text-orange-400 bg-slate-800")}
                    title="Underline"
                >
                    <UnderlineIcon className="w-3.5 h-3.5" />
                </button>
                <div className="w-px h-4 bg-slate-700 mx-1" />
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn("p-1.5 hover:bg-slate-800 rounded transition-colors", editor.isActive('heading', { level: 2 }) && "text-orange-400 bg-slate-800")}
                    title="Heading 2"
                >
                    <span className="text-[10px] font-bold">H2</span>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn("p-1.5 hover:bg-slate-800 rounded transition-colors", editor.isActive('heading', { level: 3 }) && "text-orange-400 bg-slate-800")}
                    title="Heading 3"
                >
                    <span className="text-[10px] font-bold">H3</span>
                </button>
                <div className="w-px h-4 bg-slate-700 mx-1" />
                <button
                    onClick={setLink}
                    className={cn("p-1.5 hover:bg-slate-800 rounded transition-colors", editor.isActive('link') && "text-orange-400 bg-slate-800")}
                    title="Link"
                >
                    <LinkIcon className="w-3.5 h-3.5" />
                </button>
            </BubbleMenu>

            {/* Editor Area */}
            <div className="w-full cursor-text bg-white px-6 py-4" onClick={() => editor.commands.focus()}>
                <div className="w-full max-w-[720px] mx-auto">
                    <EditorContent editor={editor} className="w-full" />
                </div>
            </div>

            <style>{`
                .tiptap p.is-editor-empty:first-child::before {
                    color: #cbd5e1;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                    font-size: 1.125rem;
                    font-weight: 400;
                    opacity: 0.6;
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
                    border-radius: 8px;
                    margin: 1.5em auto;
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
            className={`h-8 w-8 p-0 rounded-md flex items-center justify-center transition-colors ${
                isActive 
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
        >
            {children}
        </Button>
    )
}
