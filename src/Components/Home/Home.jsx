import CustomButton from '../CustomButton'
import './Home.css'

const Home = () => {
	return (
		<>
			<section className='homeIntro'>
				<h1 className="homeIntro__text">CREATE YOUR DREAM HOME WITH OUR EXQUISITE SELECTION
					OF PRODUCTS</h1>
					<CustomButton uppercase url='/products' text='Decorate Now' />
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
				<CustomButton text='See All' url='/products'/>
				<div className="featuredCategories">
					<div className="featuredCategories__principal">
						<img
							className="featuredCategories__principal--img"
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<CustomButton featuredCategories text='New Drops' url='/products'/>
					</div>
					<div className="featuredCategories__second">
						<img
							className="featuredCategories__second--img"
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<CustomButton featuredCategories text='Category One' url='/products'/>
					</div>
					<div className="featuredCategories__third">
						<img
							className="featuredCategories__third--img"
							src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
							alt=""
						/>
						<CustomButton featuredCategories text='Category Two' url='/products'/>
					</div>
					<div className="featuredCategories__info">
						<h3 className="featuredCategories__info--text">Each piece will make your home
							the most
							<span> comfortable place</span></h3>
							<CustomButton uppercase text='Shop Now' url='/products'/>
					</div>
				</div>
			</section>
		</>
	)
}

export default Home