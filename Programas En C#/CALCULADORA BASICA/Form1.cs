using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CALCULADORA_BASICA
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnCalcular_Click(object sender, EventArgs e)
        {
            // Convertir los textos ingresados a números decimales

            if (decimal.TryParse(txtNumero1.Text, out decimal numero1) && decimal.TryParse(txtNumero2.Text, out decimal numero2))
            {
                // Realizar las operaciones

                decimal suma = numero1 + numero2;
                decimal resta = numero1 - numero2;
                decimal multiplicacion = numero1 * numero2;
                decimal division = 0; // Inicializar para evitar errores de compilación

                // Manejar la división por cero

                if (numero2 != 0)
                {
                    division = numero1 / numero2;
                    lblDivisionResultado.Text = division.ToString("0.00"); // Formatea a 2 decimales
                }
                else
                {
                    MessageBox.Show("No se puede dividir por cero.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                   
                  // No mostrar el resultado de la división en este caso
                    
                    lblDivisionResultado.Text = "Indefinido";

                    return; // Salir del evento para no mostrar resultados incorrectos
                }
               
                // Mostrar los resultados en las etiquetas
                
                lblSumaResultado.Text = suma.ToString();
                lblRestaResultado.Text = resta.ToString();
                lblMultiplicacionResultado.Text = multiplicacion.ToString();
                lblDivisionResultado.Text = division.ToString();
            }
            else
            {
                // Mostrar un mensaje de error si la entrada no es válida

                MessageBox.Show("Por favor, ingrese números válidos en ambos campos.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
               
                // Opcionalmente, limpiar las etiquetas de resultado aquí
                
                lblSumaResultado.Text = "";
                lblRestaResultado.Text = "";
                lblMultiplicacionResultado.Text = "";
                lblDivisionResultado.Text = "";
            }
        }

        private void txtNumero1_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                e.Handled = true; 
                txtNumero2.Focus(); 
            }
        }

        private void txtNumero2_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (e.KeyChar == (char)Keys.Enter)
            {
                e.Handled = true;
                btnCalcular_Click(sender, e); // Simula el clic del botón Calcular
                txtNumero1.Focus(); // Devuelve el foco a txtNumero1
                txtNumero1.SelectAll(); // Selecciona todo el texto en txtNumero1 para facilitar la edición
            }
        }
    }

}
    

