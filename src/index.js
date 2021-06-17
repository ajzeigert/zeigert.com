import './style';

import portfolio from './portfolio.json';


const ContactSection = ({content}) => {

	const prefix = (type) => {
		if ( type === 'email') {
			return 'mailto:'
		}  else if ( type === 'phone') {
			return 'tel:'
		} else {
			return "";
		}
	}

    const Contact = ({c}) => {
        return <li><strong>{c[0]}:</strong> <a href={`${prefix(c[0])}${c[1]}`}>{c[1]}</a></li>
    }

    return (
        <ul>
            {content.map(c => <Contact c={c}/>)}
        </ul>
    )
}

const ResumeSection = ({content}) => {
    return Object.entries(content).map((x,i) => {
        return (
            <Fragment>
                <h3>{x[0]}</h3>
                {x[1].map(entry => {
                    return (
                        <ul>
                            {Object.entries(entry).map(entryDetail => {
                                if (entryDetail[0] === 'Tools') {
                                    return <li><strong>{entryDetail[0]}:</strong> {entryDetail[1].join(', ')}</li>
                                }
                                return <li><strong>{entryDetail[0]}:</strong> {entryDetail[1]}</li>
                            })}
                        </ul>
                    )
                })}
            </Fragment>
        )
    })
}

const PortfolioItem = ({item}) => {
    return (
        <article className='portfolioItemContainer'>
            <div className="portfolioItemHeader">
                <h4>{item['Title']}</h4>
            </div>
            <div className='portfolioItemBody'>
                <div className='portfolioItemDescription'>
                    <p style={{padding: '0 20px 0 0'}}>{item['Description']}</p>
                    <p>
                        {item['url'] !== undefined ? item['url'] !== false ? <>URL: <a href={item['url']}>{item['url']}</a></> : <em>URL: Sorry, not publicly available</em> : false}
                    </p>
                </div>
                <div className='portfolioItemPreview'>

                    <p>
                        {item['image'] !== null ? <PortfolioImage item={item}/> : false}
                    </p>
                </div>
            </div>
        </article>
    )
}

const PortfolioImage = ({item}) => {
    return (
        <a href={`/assets/images/${item['image']}`}>
            <img src={`/assets/images/sm-${item['image']}`}/>
        </a>
    )
}

const PortfolioSection = ({content}) => {
    return content.map(section => {
        return (
            Object.entries(section).map(sect => {
                // console.log('sect', sect)
                return (
                    <div className="portfolioSection">
                        <h3>{`> ${sect[0]}`}</h3>
                        <p>{sect[1].info}</p>
                        {sect[1].examples.map(example => {
                            return <PortfolioItem item={example}/>
                        })}
                    </div>
                )
            })
        )
    })
}

const NavLink = ({id}) => {
    return (
        <li>
            {/* <Scrollchor to={`#${id}`}>
                {id}
            </Scrollchor> */}
            <a href={`#${id}`}>{id}</a>
        </li>
    )
}


const Nav = () => {
    return (
		<nav>
			<ul>
				<NavLink id="contact"/>
				<NavLink id="resumé"/>
				<NavLink id="portfolio"/>
				{/* <NavLink id="awards"/> */}
			</ul>
		</nav>
    )
}

// Maybe this for something at some point?
// https://frontendscript.com/demo/pure-css-typing-text-animation/

const Resume = () => {
    return (
		<Fragment>
			<header>
				<h1>
                    {portfolio.title}
                    {/* <span className="blinking-cursor">█</span> */}
                </h1>
				<h2>{portfolio.subtitle}</h2>
				<h3><small>version: {portfolio.version}</small></h3>
			</header>
			<Nav/>
			<main>
				<section id="contact">
					<h2>_contact <small><a href="#">home</a></small></h2>
					<ContactSection content={portfolio.contact}/>
				</section>
				<section id="resumé">
					<h2>_resumé <small><a href="#">home</a></small></h2>
					<ResumeSection content={portfolio.resume}/>
				</section>
				<section id="portfolio">
					<h2>_portfolio <small><a href="#">home</a></small></h2>
					<PortfolioSection content={portfolio.portfolio}/>
				</section>
			</main>
			<footer>
				copyright {new Date().getFullYear()} <a href="mailto:ajzeigert@gmail.com">andy zeigert</a> — made with <a href="https://preactjs.com">preact</a>
			</footer>
		</Fragment>
    )
};

export default Resume;