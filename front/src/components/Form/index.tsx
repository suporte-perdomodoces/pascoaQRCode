import { useState } from "react";
import "./Form.css";
import { UseApi } from "../../Hooks/UseApi";
import Button from "../Button";
import Input from "../Input";
import Label from "../Label";
import Recorder from "../Recorder/";

export default function Form() {
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [NF, setNF] = useState("");

    const postApi = new UseApi().postApi;

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleNFChange = (e: React.ChangeEvent<HTMLInputElement>) => setNF(e.target.value);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedPhoneNumber = formatPhoneNumber(inputValue);
        setPhoneNumber(formattedPhoneNumber);
    };

    function formatPhoneNumber(value: string) {
        const cleaned = value.replace(/\D/g, "");
        let formattedNumber = cleaned;

        if (cleaned.length > 0) {
            formattedNumber = `+${cleaned.slice(0, 2)}`;
        }
        if (cleaned.length > 2) {
            formattedNumber += ` (${cleaned.slice(2, 4)}`;
        }
        if (cleaned.length > 4) {
            formattedNumber += `) ${cleaned.slice(4, 9)}`;
        }
        if (cleaned.length > 9) {
            formattedNumber += `-${cleaned.slice(9, 13)}`;
        }

        return formattedNumber;
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        console.log("Entrou")

        if (!videoBlob) {
            alert("Por favor, grave um vídeo antes de enviar.");
            return;
        }

        if (!name || !NF || !phoneNumber) {
            alert("Por favor, preencha todos as iformações.");
            return;
        }

        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");



        const dataPost = {
            name,
            nf: NF,
            phone: cleanedPhoneNumber,
            file: videoBlob,
        }


        const res = postApi.newPost(dataPost);

        console.log("QRCode: ", res);

        // try {
        //     // Primeiro, envia os dados para o API
        //     const dataResponse = await fetch("http://localhost:5000/saveData", {
        //         method: "POST",
        //         body: formData,
        //     });

        //     if (!dataResponse.ok) {
        //         alert("Erro ao enviar os dados para o banco.");
        //         return;
        //     }

        //     // Agora, envia o vídeo para o servidor
        //     const videoFormData = new FormData();
        //     videoFormData.append("video", videoBlob, "gravacao.webm");

        //     const videoResponse = await fetch("http://localhost:5000/uploadVideo", {
        //         method: "POST",
        //         body: videoFormData,
        //     });

        //     if (videoResponse.ok) {
        //         alert("Dados e vídeo enviados com sucesso!");
        //     } else {
        //         alert("Erro ao enviar o vídeo.");
        //     }
        // } catch (error) {
        //     console.error("Erro na requisição:", error);
        //     alert("Erro ao conectar com o servidor.");
        // }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="formContent">
                <div>
                    <Recorder setVideoBlob={setVideoBlob} />
                </div>

                <div className="clientData">
                    <h2>Dados do Cliente</h2>
                    <Label htmlFor="name" className="video-label">Nome:</Label>
                    <Input type="text" id="name" name="name" className="video-input" placeholder="" value={name} r onChange={handleNameChange} />

                    <Label htmlFor="phoneNumber" className="video-label">Telefone:</Label>
                    <Input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="video-input"
                        placeholder="+XX (XX) XXXXX-XXXX"
                        value={phoneNumber}
                        r
                        onChange={handlePhoneNumberChange} />

                    <Label htmlFor="NF" className="video-label">Nota Fiscal:</Label>
                    <Input
                        type="text"
                        id="NF"
                        name="NF"
                        className="video-input"
                        placeholder=""
                        value={NF}
                        r
                        onChange={handleNFChange} />
                </div>
            </div>

            <Button type="submit" className="video-button" d={false}>Enviar</Button>
        </form>
    );
}