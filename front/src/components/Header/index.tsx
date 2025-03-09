import './Header.css';
import Button from "../Button";


type Props = {
    props: {
        buttonTitle: string;
        onclick: () => void;
    }
}


export default function Header({ props }: Props) {

    return (
        <header className="header-container">
            <img src="/image/logoPblue.png" alt="logo P" className='header-logo' />
            <Button onClick={props.onclick} className='header-button-management'>
                {props.buttonTitle}
            </Button>
        </header>
    );
}
