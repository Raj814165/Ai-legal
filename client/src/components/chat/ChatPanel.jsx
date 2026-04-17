import React from 'react'
import { documentByType } from '../../data/documentCatalog'

function getFieldType(field) {
  const text = `${field.key} ${field.q}`.toLowerCase();

  if (text.includes('date')) return 'date';
  if (text.includes('time')) return 'time';

  if (
    text.includes('address') ||
    text.includes('describe') ||
    text.includes('details') ||
    text.includes('facts') ||
    text.includes('issue') ||
    text.includes('grounds') ||
    text.includes('prayer') ||
    text.includes('statement') ||
    text.includes('relief') ||
    text.includes('demand') ||
    text.includes('question')
  ) {
    return 'textarea';
  }

  return 'text';
}

function getFieldGroup(field) {
  const text = `${field.key} ${field.q}`.toLowerCase();

  if (
    text.includes('name') ||
    text.includes('address') ||
    text.includes('contact') ||
    text.includes('occupation') ||
    text.includes('designation') ||
    text.includes('age')
  ) {
    return 'Personal Details';
  }

  if (
    text.includes('department') ||
    text.includes('station') ||
    text.includes('court') ||
    text.includes('authority') ||
    text.includes('vendor') ||
    text.includes('landlord') ||
    text.includes('recipient') ||
    text.includes('employer') ||
    text.includes('respondent')
  ) {
    return 'Office and Parties';
  }

  if (
    text.includes('date') ||
    text.includes('time') ||
    text.includes('location') ||
    text.includes('platform') ||
    text.includes('tenancy') ||
    text.includes('case') ||
    text.includes('vehicle')
  ) {
    return 'Case Details';
  }

  if (
    text.includes('amount') ||
    text.includes('loss') ||
    text.includes('fee') ||
    text.includes('transaction')
  ) {
    return 'Financial Details';
  }

  if (
    text.includes('remedy') ||
    text.includes('relief') ||
    text.includes('deadline') ||
    text.includes('delivery') ||
    text.includes('application type') ||
    text.includes('prayer') ||
    text.includes('demand')
  ) {
    return 'Requested Outcome';
  }

  return 'Incident and Statement';
}

function groupQuestions(questions) {
  const groups = [];

  questions.forEach((question) => {
    const title = getFieldGroup(question);
    const existingGroup = groups.find((group) => group.title === title);

    if (existingGroup) {
      existingGroup.fields.push(question);
      return;
    }

    groups.push({ title, fields: [question] });
  });

  return groups;
}

export default function ChatPanel({ docType, answers, onChange }){
  const questions = documentByType[docType]?.questions || [];
  const groups = groupQuestions(questions);
  const completedCount = questions.filter((question) => `${answers[question.key] || ''}`.trim()).length;

  function handleFieldChange(key, value) {
    onChange({ ...answers, [key]: value });
  }

  return (
    <div className="mt-5">
      <div className="form-intro">
        <div>
          <div className="form-intro__title">Fill In The Details</div>
          <div className="text-sm muted">Enter the case information below. The document will be arranged automatically in a formal format.</div>
        </div>
        <div className="form-intro__badge">{completedCount}/{questions.length} filled</div>
      </div>

      <div className="form-progress mt-4">
        <div
          className="form-progress__bar"
          style={{ width: `${questions.length ? (completedCount / questions.length) * 100 : 0}%` }}
        />
      </div>

      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <section key={group.title} className="form-section">
            <div className="form-section__header">
              <h3 className="form-section__title">{group.title}</h3>
              <div className="text-xs muted">{group.fields.length} fields</div>
            </div>

            <div className="form-grid">
              {group.fields.map((field) => {
                const fieldType = getFieldType(field);
                const isTextarea = fieldType === 'textarea';

                return (
                  <label
                    key={field.key}
                    className={`form-field ${isTextarea ? 'form-field--full' : ''}`}
                  >
                    <span className="form-field__label">{field.q}</span>
                    {isTextarea ? (
                      <textarea
                        value={answers[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={`Enter ${field.q.toLowerCase()}`}
                        className="form-textarea form-textarea--compact"
                      />
                    ) : (
                      <input
                        type={fieldType}
                        value={answers[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={fieldType === 'text' ? `Enter ${field.q.toLowerCase()}` : undefined}
                        className="form-input w-full"
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
