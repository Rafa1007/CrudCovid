import React, { useState } from "react";
import axios from "axios";

const AddHospitalizadoMoal = ({showModal, onClose, onSave }) => {

    const [formData, setFormData] = useState ({
        nombre: '',
        apellido: '',
        fecha_registro: '',
        estado: '',
        edad: '',
        numero_hospitalizados: '',
        sexo: '',
        status: ''
    });
    


}