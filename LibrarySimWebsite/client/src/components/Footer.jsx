import React from 'react'
import FooterCSS from './Footer.module.css'

const Footer = () => {
  return (
    <div className={FooterCSS.footer}>
        <div className={FooterCSS.row}>
            <div className={FooterCSS.footer_box}>
                <h1>Whispering Pines Library</h1>

                <div className={FooterCSS.footer_text_box}>
                    <p>125 Evergreen Lane Havenbrook, CT 12345</p>
                    <p>Tel: 123-456-7890</p>
                </div>
            </div>
            <div className={FooterCSS.footer_box}>
                <h1>Sign Up for our Email List</h1>
                <div className={FooterCSS.footer_email_signup}>
                    <form>
                        <label htmlFor="email_address">Email Address:</label>
                        <input id="email_address" type="text" required maxLength="15" />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>

            <div className={FooterCSS.footer_box}>
                <h1>Hours</h1>
                <div id="footer_text_box">
                    <ul className={FooterCSS.hours_list}>
                    <li>Monday: 9am-7pm</li>
                    <li>Tuesday: 9am-7pm</li>
                    <li>Wednesday: 9am-7pm</li>
                    <li>Thursday: 9am-7pm</li>
                    <li>Friday: 9am-4pm</li>
                    <li>Monday: 9am-4pm</li>
                    <li>Sunday: Closed</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer