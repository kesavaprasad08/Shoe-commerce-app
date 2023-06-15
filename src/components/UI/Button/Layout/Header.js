import classes from './Header.module.css';
const Header = () => {
    return <header className={classes.header}>
    <h1>Shoe Commerce Website</h1>
    <button>Show Cart</button>
    </header>
}

export default Header;