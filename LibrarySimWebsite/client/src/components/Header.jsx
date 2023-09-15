import React from 'react'
import HeaderCSS from './Header.module.css'

const Header = () => {
  return (
    <>
        <div className={HeaderCSS.top_contact_bar}>
            <p className={HeaderCSS.top_contact_bar_text}>125 Evergreen Lane Havenbrook, CT 12345 Tel: 123-456-7890</p>
        </div>
        <div className={HeaderCSS.header_login_section}>
            <a href="">
                <img className={HeaderCSS.logo} src="../assets/images/WP_Logo.png" alt="Library Logo" />
            </a>
            <div className={HeaderCSS.header_login_bars}>
              <form>
                <label className={HeaderCSS.header_login_label} htmlFor="username">Username:</label>
                <input id="username" type="text" required maxLength="15" />

                <label className={HeaderCSS.header_login_label} htmlFor="password">Password:</label>
                <input id="password" type="text" required maxLength="15" />

                <button type="submit">Log In</button>
                <button>Register</button>

              </form>
            </div>
        </div>
        <div className={HeaderCSS.navigation_bar}>

        </div>
    </>
  )
}

export default Header