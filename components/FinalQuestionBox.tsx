import { useEffect, useState } from 'react';

type Props = { onDecide: (tag: string, addendum: string) => void };

export default function FinalQuestionBox({ onDecide }: Props) {
  const [question, setQuestion] = useState('最後の一問');
  const [options, setOptions] = useState<Array<{tag:string;label:string}>>([]);

  useEffect(() => {
    fetch('/api/pillow-assist-question')
      .then(r => r.json())
      .then(j => {
        console.log('[final_q] GET question', j);
        setQuestion(j?.question ?? '最後の一問');
        setOptions(j?.options ?? [
          {tag:'heat',label:'ムレ/暑さ'},
          {tag:'shoulder',label:'肩・首のこり'},
          {tag:'snore',label:'いびき'},
          {tag:'none',label:'特になし'},
        ]);
      })
      .catch(() => {});
  }, []);

  async function answer(tag: string) {
    console.log('[final_q] POST answer=', tag);
    const r = await fetch('/api/pillow-assist-answer', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ finalTag: tag })
    }).then(res => res.json()).catch(() => ({}));
    onDecide(tag, r?.addendum ?? '');
  }

  return (
    <div className="mb-3 rounded-xl border p-3 bg-white/70">
      <p className="text-sm font-medium">{question}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.tag} onClick={()=>answer(o.tag)} className="px-3 py-1 rounded-lg border">
            {o.label}
          </button>
        ))}
        <button onClick={()=>answer('skip')} className="px-3 py-1 rounded-lg border opacity-70">スキップ</button>
      </div>
    </div>
  );
} 