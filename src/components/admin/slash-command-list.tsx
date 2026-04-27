import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  List, ListOrdered, Quote, Code, Image as ImageIcon, CheckSquare, Minus, MessageSquare, AlertCircle, HelpCircle, MousePointerClick, Table as TableIcon
} from 'lucide-react'

export const COMMAND_ITEMS = [
  {
    title: 'Heading 1',
    description: 'Big section heading.',
    icon: <Heading1 className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading.',
    icon: <Heading2 className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    },
  },
  {
    title: 'Heading 3',
    description: 'Small section heading.',
    icon: <Heading3 className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    },
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bulleted list.',
    icon: <List className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Numbered List',
    description: 'Create a list with numbering.',
    icon: <ListOrdered className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: 'Table',
    description: 'Insert a 3x3 table.',
    icon: <TableIcon className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    },
  },
  {
    title: 'Task List',
    description: 'Track tasks with a to-do list.',
    icon: <CheckSquare className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run()
    },
  },
  {
    title: 'Quote',
    description: 'Capture a quote.',
    icon: <Quote className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('blockquote').run()
    },
  },
  {
    title: 'Code',
    description: 'Capture a code snippet.',
    icon: <Code className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('codeBlock').run()
    },
  },
  {
    title: 'Divider',
    description: 'Visually divide blocks.',
    icon: <Minus className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
  },
  {
    title: 'Callout',
    description: 'Important highlight box.',
    icon: <AlertCircle className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('calloutBlock').run()
    },
  },
  {
    title: 'Info Box',
    description: 'Neutral information block.',
    icon: <MessageSquare className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode('infoBox').run()
    },
  },
  {
    title: 'FAQ Section',
    description: 'Inject dynamic FAQs.',
    icon: <HelpCircle className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).insertContent('[faq_section]').run()
    },
  },
  {
    title: 'CTA Button',
    description: 'Inject action button.',
    icon: <MousePointerClick className="w-4 h-4" />,
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).insertContent('[cta_button]').run()
    },
  },
]

export const SlashCommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }
      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }
      if (event.key === 'Enter') {
        enterHandler()
        return true
      }
      return false
    },
  }))

  if (!props.items.length) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col w-64 max-h-80 overflow-y-auto z-[9999]">
      <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
        Basic Blocks
      </div>
      <div className="p-1.5 flex flex-col gap-0.5">
        {props.items.map((item: any, index: number) => (
          <button
            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition-colors ${
              index === selectedIndex ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 shadow-sm">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{item.title}</span>
              <span className="text-[10px] text-slate-500 leading-tight">{item.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
})
SlashCommandList.displayName = 'SlashCommandList'
