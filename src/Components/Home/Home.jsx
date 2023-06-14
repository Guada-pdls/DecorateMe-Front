import './Home.css'

const Home = () => {
    return (
        <>
            <section className='homeIntro'>
                <h1 className="homeIntro__text">CREATE YOUR DREAM HOME WITH OUR EXQUISITE SELECTION
                    OF PRODUCTS</h1>
                <a href="#">
                    <button className="btn">Decorate Now<i className="fa-solid fa-arrow-right"></i></button>
                </a>
            </section>

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

            <section className="homeReviewsSection" id="homeReviewsSection">
                <h2>Users reviews</h2>
                <div className="homeReviews">
                    <div className="homeReviews__review">
                        <div className="homeReviews__review--img"></div>
                        <div className="homeReviews__review--stars"><i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"
                        ></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"
                        ></i></div>
                        <p className="homeReviews__review--text">Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit
                        </p>
                        <p className="homeReviews__review--user">User, 30</p>
                    </div>
                    <div className="homeReviews__review">
                        <div className="homeReviews__review--img"></div>
                        <div className="homeReviews__review--stars"><i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"
                        ></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"
                        ></i></div>
                        <p className="homeReviews__review--text">Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit
                        </p>
                        <p className="homeReviews__review--user">User, 30</p>
                    </div>
                    <div className="homeReviews__review">
                        <div className="homeReviews__review--img"></div>
                        <div className="homeReviews__review--stars"><i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"
                        ></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i
                            className="fa-solid fa-star"
                        ></i></div>
                        <p className="homeReviews__review--text">Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit
                        </p>
                        <p className="homeReviews__review--user">User, 30</p>
                    </div>
                </div>
            </section>
            <section className="homeGallerySection" id="homeGallerySection">
                <h2>Galería</h2>
                <div className="homeGallery">
                    <a href="/products" className="homeGallery__link item-1">
                        <h2 className="linkBox">
                            See
                        </h2>
                        <img
                            src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
                            alt="item Gallery"
                            className="homeGallery__img"
                        />
                    </a>
                    <a href="/products" className="homeGallery__link item-1">
                        <h2 className="linkBox">
                            See
                        </h2>
                        <img
                            src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
                            alt="item Gallery"
                            className="homeGallery__img"
                        />
                    </a>
                    <a href="/products" className="homeGallery__link item-2">
                        <h2 className="linkBox">
                            See
                        </h2>
                        <img
                            src="/img/comedor-moderno-3d-sala-estar-decoracion-lujo.jpg"
                            alt="item Gallery"
                            className="homeGallery__img"
                        />
                    </a>
                    <a href="/products" className="homeGallery__link item-1">
                        <h2 className="linkBox">
                            See
                        </h2>
                        <img
                            src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
                            alt="item Gallery"
                            className="homeGallery__img"
                        />
                    </a>
                    <a href="/products" className="homeGallery__link item-1">
                        <h2 className="linkBox">
                            See
                        </h2>
                        <img
                            src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
                            alt="item Gallery"
                            className="homeGallery__img"
                        />
                    </a>
                    <a href="/products" className="homeGallery__link item-2">
                        <h2 className="linkBox">
                            See
                        </h2>
                        <img
                            src="/img/sofa-gris-salon-blanco-espacio-copiar.jpg"
                            alt="item Gallery"
                            className="homeGallery__img"
                        />
                    </a>
                </div>
            </section>
        </>
    )
}

export default Home