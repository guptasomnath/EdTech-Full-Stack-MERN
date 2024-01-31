import React from 'react'

const ContactFormDialog = () => {
  return (
    <div>
        <p className="pb-3 font-semibold text-lg">Contact Form</p>
        <form action="" className="flex flex-col pb-8 gap-5">
            <input className="w-full py-2 px-3" type="text" placeholder="Enter your name" />
            <input className="w-full py-2 px-3" type="text" placeholder="Enter your email *" />
            <textarea className="w-full py-2 px-3" name="" id="" cols={30} rows={3} placeholder="Enter message *"></textarea>
            <button className="px-3 py-2 bg-[#4c8efb] text-white hover:shadow-lg">Send</button>
        </form>
    </div>
  )
}

export default ContactFormDialog;