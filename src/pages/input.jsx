import { useState } from 'react'
import logo from "/igtsLOGO.png"

export default function InputPage() {
  const [isSubmit,setSubmit] = useState(false)
  const submit = (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target); 
    console.log(formData.get("input"));
    setSubmit(true)
  };
  return (
    <div className='abc'>
      <img className="logo" src={logo} />
      <h1 className="name">A</h1>
      {!isSubmit ? <form onSubmit={submit}>
        <input name="input" placeholder='INPUT' type="number" step="10" min="0" max="250" required={true}/>
        <button type="submit" className='status-button'>SUBMIT</button>
      </form> : <button className='status-button' disabled>SUBMITTED</button>}
      <h1 className='round'>ROUND 1</h1>
    </div>
  )
}

