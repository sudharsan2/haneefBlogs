const Dashboard = () => {
    const styles = {
        fontFamily: '"sans-serif"',
        WebkitFontSmoothing: 'antialiased',
        fontSize: '28px',
        fontWeight: 700,
        marginTop: '6px',
        marginBottom: '45px',
        position: 'sticky',
        left: '0px',
        color: 'rgb(0, 0, 0)',
        maxWidth: '615px'
    };

    return (
        <h1 style={styles}>Active users</h1>
    );
}

export default Dashboard;
