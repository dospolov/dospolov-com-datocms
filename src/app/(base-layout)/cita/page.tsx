'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function CitaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add all form fields
      formData.append(
        '98605570-0480-46be-ae73-91805b3bbddf',
        '3121a9b6-9ebd-406e-a867-d9844004288c',
      );
      formData.append('7c7b7839-efcd-4d46-bcfe-2db0c34d8584', '');
      formData.append(
        'alert_pasaporte_no_valido',
        'El pasaporte introducido no es correcto.\n\nIntroduce sólo NÚMEROS Y LETRAS.',
      );
      formData.append('alert_dni_introducido_no_valido', 'El dni introducido no es válido');
      formData.append(
        'alert_NIE_NIF_CIF_empresario_incorrecto',
        'El NIE/NIF/CIF del empresario introducido no es correcto.',
      );
      formData.append('alert_gracias', 'Gracias por usar el servico de Internet Cita Previa.');
      formData.append('alert_NIE_no_correcto', 'El NIE introducido no es correcto');
      formData.append(
        'alert_campoNIE_obligado',
        'Información de CITA PREVIA:\n\nEl campo NIE es obligatorio Por ejemplo X 1234567 H',
      );
      formData.append(
        'alert_indicar_pais_nacionalidad',
        'Información de CITA PREVIA:\n\nIndica el país de nacionalidad',
      );
      formData.append(
        'alert_indicar_des_citado',
        'El nombre y apellidos no puede contener números ni caracteres especiales.',
      );
      formData.append(
        'alert_indicar_anno_nacimiento',
        'Indica tu año de nacimiento.\n  Por ejemplo: 1973',
      );
      formData.append(
        'alert_indicar_fcaducidad_ultarjeta',
        'Indica la fecha de caducidad de tu última tarjeta en vigor.\n   Por ejemplo 07/03/2010',
      );
      formData.append(
        'alert_fcaducidad_incorrecta',
        'La fecha de de caducidad introducida no es correcta',
      );
      formData.append('status_reagrupacion', 'MHAP Cita Previa Reagrupación Familiar');
      formData.append(
        'Con.msgRelleneCampos',
        'Por favor, rellena todos los campos obligatorios del formulario de cita previa.',
      );
      formData.append('alert_ncolegiado_no_valido', 'El Nº colegiado no es válido');
      formData.append('rdbTipoDoc', 'N.I.E.');
      formData.append('txtIdCitado', 'Y9619628F');
      formData.append('txtDesCitado', 'HALYNA PIKALOVA');

      // Create a form element
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://icp.administracionelectronica.gob.es/icpco/acCitar';
      form.enctype = 'multipart/form-data';

      // Append all form data to the form
      for (const [key, value] of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;

        // Check if value is a string, otherwise convert it
        input.value = typeof value === 'string' ? value : String(value);

        form.appendChild(input);
      }

      // Append form to body, submit it, and remove it
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Cita Previa</h1>
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isSubmitting ? 'Enviando...' : 'Solicitar Cita Previa'}
      </Button>
    </div>
  );
}
