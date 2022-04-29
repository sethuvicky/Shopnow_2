import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { getPRoductdetails } from '../../actions/productActions'
import { useDispatch,useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import { addtoCart } from '../../actions/cartActions'
import Headers from '../layout/Headers'
import { Fragment } from 'react'
import { useCookies } from "react-cookie";
import { newReview } from '../../actions/productActions'
import ListReviews from '../reviews/Listreviews'

const Prodcutdetails = () => {
  const [cookies, setCookie,removeCookie] = useCookies("token");

  const [quantity, setQuantity] = useState(1)
  const increaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber >= item.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty)
}

const decreaseQty = () => {

    const count = document.querySelector('.count')

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty)

}


  const {item} = useSelector(state => state.productsdetails.product)
  console.log(item)
  const got = useSelector(state => state)
  console.log(got)
  let [cartitems,setcart] = useState([])
  let dispatch = useDispatch()
  let {id} = useParams()
  useEffect(()=>{
    dispatch(getPRoductdetails(id))

  },[dispatch,id])
  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
        star.starValue = index + 1;

        ['click', 'mouseover', 'mouseout'].forEach(function (e) {
            star.addEventListener(e, showRatings);
        })
    })

    function showRatings(e) {
        stars.forEach((star, index) => {
            if (e.type === 'click') {
                if (index < this.starValue) {
                    star.classList.add('orange');

                    setRating(this.starValue)
                } else {
                    star.classList.remove('orange')
                }
            }

            if (e.type === 'mouseover') {
                if (index < this.starValue) {
                    star.classList.add('yellow');
                } else {
                    star.classList.remove('yellow')
                }
            }

            if (e.type === 'mouseout') {
                star.classList.remove('yellow')
            }
        })
    }
}

//   const  adcart = ()=>{
//     let a = [item]
//     a.push(JSON.parse(localStorage.getItem('session')));
//     localStorage.setItem('session', JSON.stringify(a));
//     let got = localStorage.getItem("session")
//     let ready = JSON.parse(got)

    
   
// dispatch(addtoCart(ready))    }
const add = () => {
  dispatch(addtoCart(id, quantity));
}
const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');
const reviewHandler = () => {
  const formData = new FormData();

  formData.set('rating', rating);
  formData.set('comment', comment);
  formData.set('productId', id);

  dispatch(newReview(formData,cookies.token));
  console.log(formData)
}
  return (
    <Fragment>

    <Headers />

    <div className="row f-flex justify-content-around">
     {item &&      <Fragment> <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {item.images && item.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img style={{height:"200px"}} className="d-block w-100" src={image.url} alt={item.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>

                        </div>
                        
                        <div className="col-12 col-lg-5 mt-5">
          <h3>{item.name}</h3>
          <p id="product_id">Product # sklfjdk35fsdf5090</p>
          <hr />
          <div className="rating-outer">
            <div className="rating-inner" />
          </div>
          <span id="no_of_reviews">({`${item.numofReviews}`} Reviews)</span>
          <hr />
          <p id="product_price">rs :{item.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
            <input type="number" className="form-control count d-inline" value={quantity} readOnly />
            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
          </div>
          <button onClick={add} type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
          <hr />
          <p>Status: <span id="stock_status">In Stock</span></p>
          <hr />
          <h4 className="mt-2">Description:</h4>
          <p>{item.description}</p>
          <hr />
          <p id="product_seller ">Sold by: <strong>Amazon</strong></p>
          <button onClick={setUserRatings} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
            Submit Your Review
          </button>
          
          <div className="row mt-2">
            <div className="rating w-50">
              <div className="modal fade" id="ratingModal" tabIndex={-1} role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ul className="stars">
                        <li className="star"><i className="fa fa-star" /></li>
                        <li className="star"><i className="fa fa-star" /></li>
                        <li className="star"><i className="fa fa-star" /></li>
                        <li className="star"><i className="fa fa-star" /></li>
                      </ul>
                      <textarea      onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3" defaultValue={"\n                                        "} />
                      <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>Submit</button>
                    </div>
                    
                  </div>
                  
                </div>
                
              </div>

            </div>
          </div>
        </div>
        <ListReviews reviews={item.reviews} />
</Fragment> }

  </div>

  </Fragment>

  )
}

export default Prodcutdetails