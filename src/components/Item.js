export default function Item(props)
{
    let prObj=props.prObj
return(
    <div className='card h-100 mb-5'>
        <div className="card-header"></div>
        <img src={prObj.profileImage} className="w-100" alt="" />
        <div className="cardbody mb-0 h-75" >
            
            <h4>Name: {prObj.productname}</h4>
            <h4>Price:{prObj.price}</h4>
            <h4>Brand:{prObj.Brand}</h4>
            <div className="card-footer h-25">
                <button className="btn btn-warning">Buy Now</button>
                <button className="btn btn-danger ms-3">Add to Cart</button>
            </div>
            
        </div>
    </div>
)
}