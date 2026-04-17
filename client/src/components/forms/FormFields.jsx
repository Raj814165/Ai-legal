import React from 'react'

function inferFieldType(key, label){
  const k = key.toLowerCase();
  const l = (label||'').toLowerCase();
  if (k.includes('date') || l.includes('date')) return 'date';
  if (k.includes('time') || l.includes('time')) return 'time';
  if (k.includes('contact') || k.includes('phone') || k.includes('mobile')) return 'tel';
  if (k.includes('amount') || k.includes('fee') || k.includes('loss')) return 'number';
  if (k.includes('email')) return 'email';
  // larger text areas for addresses, descriptions, details
  if (k.includes('address') || k.includes('description') || k.includes('details') || l.includes('describe') || l.includes('details') || l.includes('describe') || l.includes('background') || l.includes('incident') || l.includes('issues') || l.includes('statement')) return 'textarea';
  return 'text';
}

export default function FormFields({ questions = [], answers = {}, onChange }){
  function update(key, value){
    onChange && onChange({ ...answers, [key]: value })
  }

  return (
    <div className="mt-4 form-fields">
      <div className="form-section form-section--compact">
        <div className="form-section__header">
          <div className="form-section__title">Fill the form</div>
          <div className="muted text-sm">Provide accurate details for the document</div>
        </div>

        <div className="form-grid form-grid--compact">
          {questions.map((q) => {
            const type = inferFieldType(q.key, q.q);
            const isArea = type === 'textarea';
            const full = isArea || q.key.toLowerCase().includes('description') || q.key.toLowerCase().includes('details') || q.key.toLowerCase().includes('incident') || q.key.toLowerCase().includes('background') || q.key.toLowerCase().includes('address');
            return (
              <div key={q.key} className={`form-field ${full ? 'form-field--full' : ''}`}>
                <label className="form-field__label">{q.q}</label>
                {isArea ? (
                  <textarea
                    className="form-textarea form-textarea--compact"
                    value={answers[q.key] || ''}
                    onChange={(e) => update(q.key, e.target.value)}
                    placeholder={q.q}
                  />
                ) : (
                  <input
                    className="form-input"
                    type={type}
                    value={answers[q.key] || ''}
                    onChange={(e) => update(q.key, e.target.value)}
                    placeholder={q.q}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
