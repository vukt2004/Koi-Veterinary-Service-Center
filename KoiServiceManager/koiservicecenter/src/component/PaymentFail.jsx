const PaymentFail = () => {
    return (
        <div style={styles.container}>
            <img
                src="https://via.placeholder.com/150" // Đường dẫn tới hình ảnh minh họa thất bại
                alt="Thanh toán thất bại"
                style={styles.image}
            />
            <h1 style={styles.header}>Thanh toán thất bại</h1>
            <p style={styles.message}>Rất tiếc, thanh toán của bạn không thành công. Vui lòng kiểm tra lại thông tin và thử lại sau.</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        textAlign: 'center',
    },
    image: {
        width: '150px',
        height: '150px',
        marginBottom: '20px',
    },
    header: {
        fontSize: '2em',
        fontWeight: 'bold',
    },
    message: {
        fontSize: '1.2em',
        marginBottom: '20px',
    },
};

export default PaymentFail;
