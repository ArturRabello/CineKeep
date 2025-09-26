import Input from "./Input"
import Logo from "./Logo"
import Icone from "./UserIcon"
import SearchContainer from "./SearchContainer/SearchContainer"

/* Componete que o Header da página Inicial*/
function Header() {
    return (
        <div className="flex flex-row justify-evenly items-center bg-red-950 h-[80px] sm:h-[60px] ">
            <Logo/>
            <SearchContainer/>
            <Icone/>
        </div>
    )
}

export default Header