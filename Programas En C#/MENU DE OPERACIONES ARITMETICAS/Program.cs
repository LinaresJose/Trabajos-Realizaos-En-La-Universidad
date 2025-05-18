using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MENU_DE_OPERACIONES_ARITMETICAS
{
    class Program
    {
        static void Main(string[] args)
        {
            int opcion = 0;

            do
            {
                Console.Clear();
                Console.WriteLine("         MENU       ");
                Console.WriteLine("\n Seleccione una opcion:\n");
                Console.WriteLine("1.- Calcular Area de un Trapecio");
                Console.WriteLine("2.- Volumen de una Esfera");
                Console.WriteLine("3.- Mayor de 2 Nuemeros");
                Console.WriteLine("4.- Salir");
                opcion = Convert.ToInt32(Console.ReadLine());

                switch (opcion)
                {
                    case 1:
                        Console.Clear();
                        double Area, basemayor, basemenor, altura = 0;
                        Console.WriteLine("Calcular Area de un Trapecio");
                        Console.Write("\n Ingrese la Base Mayor: ");
                        basemayor = Convert.ToDouble(Console.ReadLine());
                        Console.Write("\n Ingrese la Base Menor: ");
                        basemenor = Convert.ToDouble(Console.ReadLine());
                        Console.Write("\n Ingrese la Altura: ");
                        altura = Convert.ToDouble(Console.ReadLine());

                        Area = ((basemayor + basemenor) * altura) / 2;
                        Console.Write("\n El Area del trapecio es: {0}cm2",Area);
                        break;
                    case 2:
                        Console.Clear();
                        double volumen, radio = 0;
                        Console.WriteLine("Calcular el Volumen de una Esfera");
                        Console.Write("\n Ingrese el Radio: ");
                        radio = Convert.ToDouble(Console.ReadLine());

                        volumen = (4.0 / 3.0) * Math.PI * (Math.Pow(radio, 3));
                        Console.Write("\n El Volumen de la Esfera es: {0}m3",volumen);
                        break;
                    case 3:
                        Console.Clear();
                        double numero1, numero2 = 0;
                        Console.WriteLine("Mayor de 2 numeros");
                        Console.Write("\n Ingrese Numero 1: ");
                        numero1 = Convert.ToDouble(Console.ReadLine());
                        Console.Write("\n Ingrese Numero 2: ");
                        numero2 = Convert.ToDouble(Console.ReadLine());

                        if (numero1 > numero2)
                        {
                            Console.Write("\n"+numero1+" Es Mayor ");
                        }
                        else if(numero1<numero2)
                        {
                            Console.Write("\n"+numero2 + " Es Mayor ");
                        }
                        else
                        {
                            Console.Write("\n Son iguales");
                        }
                        break;
                    case 4:
                        Console.Clear();
                        Console.Write("Saliendo del sistema.......");
                        break;
                    default:
                        Console.Clear();
                        Console.Write("Ingrese una opcion Valida");
                        break;
                }
                Console.ReadKey();

            } while (opcion != 4);
            

        }
    }
}
