import React from 'react'
import HomeCSS from './Home.module.css'

const Home = () => {
  return (
    <div className ={HomeCSS.home}>
        <section className={HomeCSS.library_intro_text}>
            <h1>Welcome to Whispering Pines Library</h1>
            <p>
                Welcome to the Whispering Pines Library, a serene haven of knowledge
                and inspiration nestled in Havenbrook. Explore our vast collection,
                indulge in quiet contemplation, and embark on a journey of discovery
                within our enchanting walls.
            </p>

            <p>
                Whispering Pines Library, established in the late 18th century by
                reclusive scholar Ambrose Hawthorne, has captivated seekers of
                knowledge for generations. With its extraordinary collection of rare
                books and a mystical aura, the library has evolved from a humble cabin
                to a grand Victorian-style building, becoming a cherished symbol of
                intellectual exploration in Havenbrook.
            </p>
        </section>
        <section className={HomeCSS.home_search_catalog}>
            <h2>Search Our Catalog</h2>
            <form className={HomeCSS.catalog_search}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input id="title" type="text" />
                </div>
        
                <div>
                    <label htmlFor="author">Author:</label>
                    <input id="author" type="text" />
                </div>
        
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input id="genre" type="text" list="genres" />
                    <datalist id="genres">
                    <option>Adventure</option>
                    <option>Mystery</option>
                    <option>Fantasy</option>
                    <option>Historical Fiction</option>
                    <option>Horror</option>
                    <option>Romance</option>
                    <option>Science Fiction</option>
                    <option>Biography</option>
                    </datalist>
                </div>
        
                <button type="submit">Search</button>
                <button type="reset">Clear</button>
            </form>
        </section>
    </div>
  )
}

export default Home