interface PropsContainer {
    onClick?: any
}

const Hamburger: React.FC<PropsContainer> = ({ onClick }) => <label className="mtp-hamburger" onClick={onClick}>
    <input type="checkbox"></input>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path className="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
        <path className="line--2" d="M0 50h70" />
        <path className="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
    </svg>
</label>;

export default Hamburger;