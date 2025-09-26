import Header from "../components/Header"
import ListMovie from "../components/ListMovie/ListMovie"
import StatusMovie from "../components/StatusMovie/StatusMovie"

{/* componente que representa a pagina Inicial */}
function home() {
    return (
        <div className="grid grid-rows-[80px_auto]">
                <Header/>
            <div className="grid sm:grid-cols-[850px_300px] justify-center items-starts pt-6 gap-10 p-4 text-white">
                <ListMovie/>
                <StatusMovie/>
            </div>
        </div>
    )
}

export default home