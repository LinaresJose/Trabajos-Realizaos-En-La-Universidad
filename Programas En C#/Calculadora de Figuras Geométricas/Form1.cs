using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Calculadora_de_Figuras_Geométricas
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Inicializar la interfaz
            OcultarDimensiones();

        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void lblResultado_Click(object sender, EventArgs e)
        {

        }

        private void cmbFigura_SelectedIndexChanged(object sender, EventArgs e)
        {
            OcultarDimensiones(); // Ocultar todas las dimensiones primero

            // Limpiar los TextBox
            txtRadio.Text = "";
            txtBase.Text = "";
            txtAltura.Text = "";
            lblResultado.Text = "";

            switch (cmbFigura.SelectedItem?.ToString())
            {
                case "Círculo":
                    lblRadio.Visible = true;
                    txtRadio.Visible = true;
                    txtRadio.Enabled = true;
                    break;
                case "Rectángulo":
                    lblBase.Visible = true;
                    txtBase.Visible = true;
                    txtBase.Enabled = true;
                    lblAltura.Visible = true;
                    txtAltura.Visible = true;
                    txtAltura.Enabled = true;
                    break;
                case "Triángulo":
                    lblBase.Visible = true;
                    txtBase.Visible = true;
                    txtBase.Enabled = true;
                    lblAltura.Visible = true;
                    txtAltura.Visible = true;
                    txtAltura.Enabled = true;
                    break;
            }

        }

        private void btnCalcular_Click(object sender, EventArgs e)
        {
            lblResultado.Text = ""; // Limpiar el resultado anterior
            double area = 0;

            switch (cmbFigura.SelectedItem?.ToString())
            {
                case "Círculo":
                    if (double.TryParse(txtRadio.Text, out double radio))
                    {
                        area = Math.PI * Math.Pow(radio, 2);
                    }
                    else
                    {
                        MessageBox.Show("Por favor, ingrese un valor válido para el radio.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return;
                    }
                    break;
                case "Rectángulo":
                    if (double.TryParse(txtBase.Text, out double baseRectangulo) && double.TryParse(txtAltura.Text, out double alturaRectangulo))
                    {
                        area = baseRectangulo * alturaRectangulo;
                    }
                    else
                    {
                        MessageBox.Show("Por favor, ingrese valores válidos para la base y la altura.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return;
                    }
                    break;
                case "Triángulo":
                    if (double.TryParse(txtBase.Text, out double baseTriangulo) && double.TryParse(txtAltura.Text, out double alturaTriangulo))
                    {
                        area = (baseTriangulo * alturaTriangulo) / 2;
                    }
                    else
                    {
                        MessageBox.Show("Por favor, ingrese valores válidos para la base y la altura.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return;
                    }
                    break;
                default:
                    MessageBox.Show("Por favor, seleccione una figura geométrica.", "Advertencia", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
            }

            lblResultado.Text = area.ToString("N2"); // Mostrar el resultado con 2 decimales

        }
        private void OcultarDimensiones()
        {
            lblRadio.Visible = false;
            txtRadio.Visible = false;
            txtRadio.Enabled = false;
            lblBase.Visible = false;
            txtBase.Visible = false;
            txtBase.Enabled = false;
            lblAltura.Visible = false;
            txtAltura.Visible = false;
            txtAltura.Enabled = false;
        }

    }
}
