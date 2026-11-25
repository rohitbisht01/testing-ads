import { useState } from 'react'
import './App.css'
import { trackEvent } from './analytics.js'
import { ARTICLE } from './article.js'
import { useArticleTracking } from './useArticleTracking.js'

const NAV_LINKS = ['Main page', 'Contents', 'Current events', 'Random article', 'About', 'Contact us']

function AdSpace({ width, height, children }) {
  return (
    <div className="ad-space" style={{ width, height }}>
      {children ?? `Ad space ${width} × ${height}`}
    </div>
  )
}

function App() {
  const articleEndRef = useArticleTracking(ARTICLE)
  const [query, setQuery] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    const value = query.trim()
    if (!value) return
    trackEvent('search', { query: value, articleId: ARTICLE.id })
  }

  const handleTocClick = (section) => {
    trackEvent('toc_click', { articleId: ARTICLE.id, section })
  }

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <span className="brand-name">Openpedia</span>
          <span className="brand-tagline">The Free Encyclopedia</span>
        </div>
        <form onSubmit={handleSearch}>
          <input
            className="search"
            type="search"
            placeholder="Search Openpedia"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </header>

      <div className="header-ad">
        {/* <AdSpace width={728} height={90} /> */}
        <ins className="adsbyadgeist"
  style={{ display: 'inline-block', width: 300, height: 250, fontFamily: 'Arial', color: '#63aa75' }}
  data-ad-slot="6b067bec94327a87b5899779"
/>
 
      </div>

      <div className="layout">
        <aside className="sidebar">
          <nav className="side-nav">
            <h3>Navigation</h3>
            {NAV_LINKS.map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </nav>
         
          <ins className="adsbyadgeist"
  style={{ display: 'inline-block', width: 300, height: 600, fontFamily: 'Arial', color: '#63aa75' }}
  data-ad-slot="6b0696a29bec7890d1bfba49"
/>
        </aside>
        

        <main className="content">
          <div className="tabs">
            <span className="tab active">Article</span>
            <span className="tab">Talk</span>
            <span className="tab-spacer" />
            <span className="tab active">Read</span>
            <span className="tab">Edit</span>
            <span className="tab">View history</span>
          </div>

          <h1 className="article-title">{ARTICLE.title}</h1>
          <p className="from-line">From Openpedia, the free encyclopedia</p>

          <table className="infobox">
            <caption>{ARTICLE.title}</caption>
            <tbody>
              <tr>
                <th colSpan={2} className="infobox-section">Scientific classification</th>
              </tr>
              {ARTICLE.infobox.map(([label, value]) => (
                <tr key={label}>
                  <th>{label}:</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            <b>Honey bees</b> {ARTICLE.summary}
          </p>

          <div className="toc">
            <strong>Contents</strong>
            <ol>
              {ARTICLE.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={() => handleTocClick(section.id)}>
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#references" onClick={() => handleTocClick('references')}>
                  References
                </a>
              </li>
            </ol>
          </div>

          {ARTICLE.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="references">
            <h2>References</h2>
            <ol className="references">
              {ARTICLE.references.map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ol>
          </section>
          <div ref={articleEndRef} />
        </main>

        <aside className="sidebar">
          <AdSpace width={300} height={250} />
          <AdSpace width={300} height={600} />  
        </aside>
      </div>

      <footer className="site-footer">
      
        <ins className="adsbyadgeist"
  style={{ display: 'inline-block', width: 970, height: 250, fontFamily: 'Arial', color: '#63aa75' }}
  data-ad-slot="6b068d149bec7890d1bfad73"
/>
        
        <small>Text is available under an open licence. Openpedia is a test site.</small>
      </footer>

     
    </div>
  )
}

export default App
