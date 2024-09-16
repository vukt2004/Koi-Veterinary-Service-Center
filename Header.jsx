import clock_icon from './assets/clock_icon.png';
import logo from './assets/fpt_university_logo.jpg';
import mail_icon from './assets/mail_icon.png';
function Header() {
    return (
        <>
            <div style={{
                backgroundColor: 'lightblue',
                padding: '20px 300px 20px 300px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'black',
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '20px' }}>📞 Hotline: 028 7300 5588</span>
                    <a style={{
                        marginRight: '20px',
                        textDecoration: 'none',
                        color: 'black'
                    }} href="https://maps.app.goo.gl/pHN7n6czhj67Y3UdA" target="_blank">📍 Address: Lot E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi Minh 700000</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a href="login.html" style={{textDecoration: 'none' }}>Login or Register</a>
                </div>
            </div>

            <div style={{
                color: 'black',
                margin: '10px 100px',
                padding: '10px 300px 5px 300px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <img src={logo} alt="Veterinarian Service" style={{ height: '75px', width: 'auto' }}></img>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '5px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                        <img src={mail_icon} style={{ height: '75px', width: 'auto' }}></img>
                        <p style={{ width: '150px', lineHeight: '1.5', marginLeft: '10px' }}> 24/7 Support <br></br>
                            Hotline: <br></br>   
                            028 7300 5588
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                        <img src={clock_icon} style={{ height: '75px', width: 'auto' }}></img>
                        <p style={{ width: '150px', lineHeight: '1.5', marginLeft: '10px' }}> Working hours <br></br>
                            Monday - Saturday<br></br>
                            7:30am to 8:00pm
                        </p>
                    </div>
                </div>
            </div>
            <div style={{
                padding: '20px 300px 20px 300px',
                display: 'flex',
                gap: '20px',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                backgroundColor: 'lightblue',
                zIndex: 1000
            }}>
                <a href="index.html" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>HOME</a>
                <a href="service.html" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>SERVICE</a>
                <a href="veterina.html" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>VETERINA</a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}></a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>ABOUT US</a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>FAQ</a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>CONTACT</a>
            </div>
        </>
    );
}

export default Header;
