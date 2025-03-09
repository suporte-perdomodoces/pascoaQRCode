import { useState } from "react";
import "./Form.css";
import { UseApi } from "../../Hooks/UseApi";
import { exibirQRCode, imprimirBlob } from "../../script/ImprimirQRCode.ts";
import Button from "../Button";
import Input from "../Input";
import Label from "../Label";
import Modal from "../Modal/index.tsx";
import Overlay from "../Overlay/index.tsx";
import Recorder from "../Recorder/";

export default function Form() {
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [NF, setNF] = useState("");
    const [imgQRCode, setImgQRCode] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadVideo, setUploadVideo] = useState(false);

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


        const res = await postApi.newPost(dataPost);

        imprimirBlob(res.newQRCode)

        setImgQRCode(exibirQRCode(res.newQRCode))

        console.log("QRCode: ", res);
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
                        onChange={handlePhoneNumberChange}
                        min={19}    
                    />

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
            
            <Button onClick={handleSubmit} type="submit" className="video-button" d={false}>Enviar</Button>

            {isUploadModalOpen && (
                <>
                    <Overlay />
                    <Modal>
                        {uploadVideo ? (
                            <p>Vídeo salvo com sucesso. A aba será fechada em 5 segundos.</p>
                        ) : (
                            <>
                                <p>Enviando vídeo... {uploadProgress.toFixed(2)}%</p>
                                <progress value={uploadProgress} max="100" />
                            </>
                        )}
                    </Modal>
                </>
            )}
        </form>
    );
}