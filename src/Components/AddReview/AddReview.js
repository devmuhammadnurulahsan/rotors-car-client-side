import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import useAuth from '../../Hooks/UseAuth';


const AddReview = () => {
    const { user } = useAuth();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('5');
    console.log(user);
    const handleReview = e => {
        setReview(e.target.value)
    }
    const handleOnSubmit = e => {
        const userReview = { name: user?.displayName, img: user?.photoURL, rating: rating, review: review }
        fetch('https://radiant-mesa-88609.herokuapp.com/reviews', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Review Added Successfully!')
                }
            })

        e.preventDefault()
    }

    const userGivenRating = {
        size: 20,
        count: 5,
        isHalf: false,
        value: 3.5,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: (newValue) => {
            setRating(`${newValue}`);
        }
    };
    return (
        <div className="custom-margin mb-5 pb-5">
            <h4 className="text-center mt-5 pt-5">Give Your Review Here!</h4>
            <div className="d-flex justify-content-center">
                {/* <ReactStars {...thirdExample} /> */}
                <form onSubmit={handleOnSubmit}>

                    <label className="mb-2 fs-5">Rating</label> <br />
                    <ReactStars {...userGivenRating} />

                    <label className="mb-2 fs-5">Review</label> <br />
                    <textarea onBlur={handleReview} name="review" rows='5' cols="30" placeholder="Write Your Review Here!"></textarea> <br />

                    <input type="submit" className="btn btn-outline-danger" />
                </form>
            </div>
        </div>
    );
};

export default AddReview;