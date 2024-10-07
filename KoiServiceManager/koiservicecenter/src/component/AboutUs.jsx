import PropTypes from 'prop-types';
function AboutUs(props) {
    return(
        <>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <img src={props.imageUrl} alt="AboutUs Image"></img>
        </>
    );
}

AboutUs.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,    
}

//AboutUs.defaultProps = {
//    title: "Chào mừng đến với Koi Veterinarian Service",
//    description: "Đội ngũ dày dặn kinh nghiệm",
//    image: "",
//}

export default AboutUs