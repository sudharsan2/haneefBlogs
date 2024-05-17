import {useSelector, useDispatch} from 'react-redux';

const Dashboard = () => {

    const lighttheme = useSelector((state) => state.theme.light);
 
    const darktheme = useSelector((state) => state.theme.dark);
 
    const themestate = useSelector((state) => state.theme.theme);

    const fontcolor = themestate? darktheme.fontcolordark: lighttheme.fontcolorlight
    const styles = {
        fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue'",
        WebkitFontSmoothing: 'antialiased',
        fontSize: '28px',
        fontWeight: 700,
        marginTop: '6px',
        marginBottom: '45px',
        marginLeft:"50px",
        position: 'sticky',
        left: '0px',
        color: fontcolor,
        maxWidth: '615px'
    };

    return (
        <p style={styles}>Active users</p>
    );
}

export default Dashboard;
