import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
	return (
		<>
			<section className='homeIntro'>
				<h1 className="homeIntro__text">CREATE YOUR DREAM HOME WITH OUR EXQUISITE SELECTION
					OF PRODUCTS</h1>
				<Link to='/products' href="#">
					<Button size='large' variant='contained' sx={{
						backgroundColor: 'wheat',
						color: '#000',
						'&:hover': {
							backgroundColor: '#000',
                            color: '#fff'
                        }
					}}>Decorate Now</Button>
				</Link>
			</section>

			{/* <section>
				<Typography variant='h4'>Featured Categories</Typography>
				<a href="/products"><button>See All</button></a>
				<div>
					<div>
						<img
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<a href="/products"><button>New Drops</button></a>
					</div>
					<div>
						<img
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<a href="/products"><button>Category One</button></a>
					</div>
					<div>
						<img
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<a href="/products"><button>Category Two</button></a>
					</div>
					<div>
						<h3>Each piece will make your home
							the most
							<span> comfortable place</span></h3>
						<a href="/products"><button>SHOP NOW</button></a>
					</div>
				</div>
			</section> */}

			<section className="featuredCategoriesSection" id="featuredCategoriesSection">
				<h2>Featured Categories</h2>
				<a href="/products"><button className="btn featuredCategoriesSection__btn">See All
					<i className="fa-solid fa-arrow-right"></i></button></a>
				<div className="featuredCategories">
					<div className="featuredCategories__principal">
						<img
							className="featuredCategories__principal--img"
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<a href="/products"><button className="btn featuredCategories__btn">New Drops</button></a>
					</div>
					<div className="featuredCategories__second">
						<img
							className="featuredCategories__second--img"
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<a href="/products"><button className="btn featuredCategories__btn">Category
							One</button></a>
					</div>
					<div className="featuredCategories__third">
						<img
							className="featuredCategories__third--img"
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<a href="/products"><button className="btn featuredCategories__btn">Category
							One</button></a>
					</div>
					<div className="featuredCategories__info">
						<h3 className="featuredCategories__info--text">Each piece will make your home
							the most
							<span> comfortable place</span></h3>
						<a href="/products"><button className="btn featuredCategories__info--btn">SHOP
							NOW</button></a>
					</div>
				</div>
			</section>
		</>
	)
}

export default Home