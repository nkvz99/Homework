import './Header.css'
interface Props {
    title:string;
}


export const Header = (props : Props)  =>{
    return (
        <header className="header">
            <h1>{props.title}</h1>
        </header>
    )
}