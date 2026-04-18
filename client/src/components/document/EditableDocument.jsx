import React, { useState } from 'react'

export default function EditableDocument({ initial = '', onChange }){
  const [value, setValue] = useState(initial)
  return (
    <textarea value={value} onChange={e=>{setValue(e.target.value); onChange && onChange(e.target.value)}} className="form-textarea w-full" />
  )
}


// mongodb+srv://Cit:qEpCuvJuRUl1kXBj@cit.mcigmea.mongodb.net/