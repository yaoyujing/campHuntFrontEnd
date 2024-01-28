import "../../assets/css/navbar.css";

export default function Navbar() {
  const divStyle = {
    width: '100px',
    height: '100px',
  };
  return (
    <div className="container">
      <img src={require('../../assets/images/logo.png')} alt="" style={divStyle}></img>
      <div className="containerButton">
        {/* <button>Register</button>
        <button>Login</button> */}
        {/* <button>List your space</button> */}
      </div>
    </div>
  );
}
