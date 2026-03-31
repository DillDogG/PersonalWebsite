import './Contact.css'
import NavBar from './NavBar.tsx'

function Contact() {

    return (
        <>
            <NavBar />

            <section id="center">
                <div>
                    <h1>Get in Touch!</h1>
                    <p>
                        You can get in contact with me through my <a href="https://www.linkedin.com/in/dylanyarbroughprogramming/" target="_blank">LinkedIn</a> or my email at <a href="mailto: dayarbrough04@gmail.com" target="_blank">"dayarbrough04@gmail.com"</a>.
                        I look forward to hearing from you!
                    </p>
                </div>
            </section>
            
            <section id="spacer"></section>
        </>
    )
}

export default Contact
