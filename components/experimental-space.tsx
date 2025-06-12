"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ThermometerSun,
  MapPin,
  Microscope,
  AlertCircle,
  Camera,
  Upload,
  RefreshCw,
  Download,
  Filter,
  ChevronRight,
  Settings,
  ArrowLeft,
  Moon,
  Sun,
  Database,
  Zap,
  X,
  HelpCircle,
  BarChart3,
  Menu,
  BookOpen,
  LayoutDashboard,
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
  Wifi,
  Archive,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { DISEASES } from "../lib/diseases" // Ajusta el path si es necesario

interface ExperimentalSpaceProps {
  onExit: () => void
}

interface DiagnosticItem {
  id: string
  name: string
  type: string
  date: string
  status: "saludable" | "infectada"
  disease?: string
  image: string
  archived: boolean
}

interface ModelMetric {
  name: string
  value: number
  change: number
  unit: string
}

interface SystemResource {
  name: string
  value: number
  max: number
  unit: string
}

interface WeatherData {
  location: string
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  forecast: {
    day: string
    temp: number
    icon: string
    condition: string
  }[]
  lastUpdated: string
}

// Datos de clima de fallback
const mockWeatherData: WeatherData = {
  location: "Valle Central (Predeterminado)",
  temperature: 24.5,
  humidity: 65,
  windSpeed: 8.2,
  condition: "Parcialmente nublado",
  forecast: [
    { day: "Hoy", temp: 24, icon: "sun", condition: "Soleado" },
    { day: "Mañana", temp: 26, icon: "cloud-sun", condition: "Parcialmente nublado" },
    { day: "Miércoles", temp: 25, icon: "cloud", condition: "Nublado" },
    { day: "Jueves", temp: 23, icon: "cloud-rain", condition: "Lluvia ligera" },
    { day: "Viernes", temp: 22, icon: "cloud", condition: "Nublado" },
  ],
  lastUpdated: new Date().toLocaleTimeString(),
}

// Función para convertir coordenadas a nombre de ciudad usando la API de OpenStreetMap Nominatim
async function getLocationName(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
    )
    const data = await response.json()

    if (data && data.address) {
      const city = data.address.city || data.address.town || data.address.village || data.address.county || ""
      const state = data.address.state || ""
      const country = data.address.country || ""

      if (city && state && country) {
        return `${city}, ${state}, ${country}`
      } else if (city && country) {
        return `${city}, ${country}`
      } else if (state && country) {
        return `${state}, ${country}`
      } else if (country) {
        return country
      } else {
        return "Ubicación detectada"
      }
    }
    return "Ubicación detectada"
  } catch (error) {
    console.error("Error obteniendo nombre de ubicación:", error)
    return "Ubicación detectada"
  }
}

// Función para obtener datos del clima basados en la ubicación
async function getWeatherData(lat: number, lon: number): Promise<Partial<WeatherData>> {
  // En un entorno real, aquí se haría una llamada a una API de clima como OpenWeatherMap
  // Para este ejemplo, simulamos datos basados en la ubicación

  // Simulación de variación basada en latitud/longitud
  const tempVariation = (Math.abs(lat) % 10) - 5
  const humidityVariation = (Math.abs(lon) % 20) - 10

  return {
    temperature: 22 + tempVariation,
    humidity: 60 + humidityVariation,
    windSpeed: 5 + (Math.abs(lat + lon) % 10),
    condition: ["Soleado", "Parcialmente nublado", "Nublado", "Lluvia ligera"][Math.abs(Math.floor(lat * lon)) % 4],
    lastUpdated: new Date().toLocaleTimeString(),
  }
}

// Actualizar el estilo y estructura del componente ExperimentalSpace para que sea más similar al diseño anterior
// Eliminar las secciones de biblioteca y métricas separadas
// Mantener solo Panel Principal, Analizador, Diagnósticos y Librería de Enfermedades
// Usar un fondo azul metálico oscuro moderno
// Hacer que la configuración aparezca en una ventana flotante con difuminado
// Asegurar que los menús sean desplegables en resoluciones pequeñas
// Implementar métricas en tiempo real para el estado del sistema

// Actualizar los imports para incluir los componentes necesarios

// Mantener las interfaces y tipos existentes

// Actualizar el componente principal
export default function ExperimentalSpace({ onExit }: ExperimentalSpaceProps) {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [storageEnabled, setStorageEnabled] = useState(true)
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false)
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any | null>(null)
  const [diseaseInfo, setDiseaseInfo] = useState<any | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedDisease, setSelectedDisease] = useState<any | null>(null)
  const [showDiseaseDetails, setShowDiseaseDetails] = useState(false)
  const [showDiagnosticDetails, setShowDiagnosticDetails] = useState(false)
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticItem | null>(null)

  // Datos del clima con información real
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData)

  // Datos de recursos del sistema
  const [systemResources, setSystemResources] = useState<SystemResource[]>([
    { name: "CPU", value: 42, max: 100, unit: "%" },
    { name: "Memoria", value: 68, max: 100, unit: "%" },
    { name: "Almacenamiento", value: 23, max: 100, unit: "%" },
    { name: "Red", value: 2.4, max: 10, unit: "MB/s" },
  ])

  // Datos de rendimiento del sistema
  const [performanceData, setPerformanceData] = useState({
    cpuHistory: [42, 45, 39, 47, 38, 42, 44, 41, 39, 43, 45, 40],
    memoryHistory: [68, 67, 69, 70, 68, 67, 66, 68, 69, 70, 71, 68],
    networkHistory: [2.4, 2.2, 2.5, 2.3, 2.6, 2.8, 2.4, 2.2, 2.1, 2.3, 2.5, 2.4],
    lastUpdated: new Date().toLocaleTimeString(),
  })

  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([
    {
      id: "1",
      name: "Manzana",
      type: "Hongo",
      date: "5 Mayo, 2025",
      status: "infectada",
      disease: "Roña del manzano",
      image: "https://fff.hort.purdue.edu/wp-content/uploads/2022/04/4.jpg",
      archived: false,
    },
    {
      id: "2",
      name: "Naranja",
      type: "Saludable",
      date: "4 Mayo, 2025",
      status: "saludable",
      image: "https://s.libertaddigital.com/2017/05/04/dekopon-fruit.jpg",
      archived: false,
    },
    {
      id: "3",
      name: "Uva",
      type: "Hongo",
      date: "2 Mayo, 2025",
      status: "infectada",
      disease: "Mildiu polvoriento",
      image: "https://www.vinetur.com/imagenes/2020/octubre/8/oidio.jpg",
      archived: false,
    },
    {
      id: "4",
      name: "Pera",
      type: "Bacteria",
      date: "1 Mayo, 2025",
      status: "infectada",
      disease: "Fuego bacteriano",
      image: "https://imagenes.cope.es/files/content_image/uploads/2025/03/03/67c58c2e63147.jpeg",
      archived: true,
    },
    {
      id: "5",
      name: "Fresa",
      type: "Saludable",
      date: "30 Abril, 2025",
      status: "saludable",
      image: "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/06/15/16552793270812.jpg",
      archived: false,
    },
  ])

  const [modelMetrics, setModelMetrics] = useState<ModelMetric[]>([
    { name: "Precisión", value: 98.7, change: 0.3, unit: "%" },
    { name: "Muestras procesadas", value: 1243, change: 56, unit: "" },
    { name: "Tiempo de respuesta", value: 1.2, change: -0.3, unit: "s" },
    { name: "Uso de CPU", value: 42, change: 5, unit: "%" },
    { name: "Uso de memoria", value: 68, change: -3, unit: "%" },
    { name: "Número de clases", value: 32, change: 0, unit: "" },
  ])

  const [diseases] = useState(
    DISEASES.map((d) => ({
      id: String(d.id),
      name: d.nombre_mostrar,
      type: d.categoria, // <-- ¡En español!
      fruit: d.afecta_a.join(", "),
      severity: d.nivel_severidad,
      description: d.descripcion,
      symptoms: d.sintomas,
      treatment: [...d.recomendaciones_organico, ...d.tratamiento_quimico],
      image: d.imagen || "/placeholder.svg?height=200&width=200"
    }))
  )

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      searchQuery === "" ||
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === null || disease.type === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Solicitar permisos de geolocalización al cargar la página
  useEffect(() => {
    if (!locationPermissionRequested) {
      setLocationPermissionRequested(true)

      const requestLocation = () => {
        if (navigator.geolocation) {
          toast({
            title: "Solicitando ubicación",
            description: "Se requiere acceso a tu ubicación para datos meteorológicos precisos.",
          })

          try {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                setLocationPermissionGranted(true)
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                setUserLocation({ lat, lon })

                // Obtener nombre de la ubicación
                const locationName = await getLocationName(lat, lon)

                // Obtener datos del clima basados en la ubicación
                const weatherInfo = await getWeatherData(lat, lon)

                // Actualizar datos del clima
                const updatedWeatherData = {
                  ...mockWeatherData,
                  ...weatherInfo,
                  location: locationName,
                  lastUpdated: new Date().toLocaleTimeString(),
                }

                setWeatherData(updatedWeatherData)

                toast({
                  title: "Ubicación obtenida",
                  description: `Datos meteorológicos actualizados para ${locationName}.`,
                })
              },
              (error) => {
                console.error("Error obteniendo ubicación:", error)
                setLocationPermissionGranted(false)

                toast({
                  title: "Error de ubicación",
                  description: "Usando datos meteorológicos predeterminados. " + error.message,
                  variant: "destructive",
                })
              },
              {
                timeout: 10000,
                enableHighAccuracy: true,
                maximumAge: 0,
              },
            )
          } catch (error) {
            console.error("Error al solicitar geolocalización:", error)
            toast({
              title: "Error de ubicación",
              description: "No se pudo acceder a la geolocalización. Usando datos predeterminados.",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Geolocalización no soportada",
            description: "Tu navegador no soporta geolocalización.",
            variant: "destructive",
          })
        }
      }

      requestLocation()
    }
  }, [locationPermissionRequested, toast])

  // Efecto para simular actualizaciones de datos en tiempo real
  useEffect(() => {
    if (!animationsEnabled) return

    const interval = setInterval(() => {
      // Actualizar recursos del sistema
      setSystemResources((prev) =>
        prev.map((resource) => {
          const randomChange = Math.random() * 6 - 3 // Valor entre -3 y 3
          let newValue = resource.value + randomChange

          // Asegurar que el valor esté dentro de los límites
          if (newValue < 0) newValue = 0
          if (newValue > resource.max) newValue = resource.max

          return {
            ...resource,
            value: Number(newValue.toFixed(1)),
          }
        }),
      )

      // Actualizar datos de rendimiento
      setPerformanceData((prev) => {
        const newCpuValue = Math.max(
          30,
          Math.min(70, prev.cpuHistory[prev.cpuHistory.length - 1] + (Math.random() * 10 - 5)),
        )
        const newMemoryValue = Math.max(
          60,
          Math.min(80, prev.memoryHistory[prev.memoryHistory.length - 1] + (Math.random() * 4 - 2)),
        )
        const newNetworkValue = Math.max(
          1.5,
          Math.min(3.5, prev.networkHistory[prev.networkHistory.length - 1] + (Math.random() * 0.6 - 0.3)),
        )

        return {
          cpuHistory: [...prev.cpuHistory.slice(1), Number(newCpuValue.toFixed(1))],
          memoryHistory: [...prev.memoryHistory.slice(1), Number(newMemoryValue.toFixed(1))],
          networkHistory: [...prev.networkHistory.slice(1), Number(newNetworkValue.toFixed(1))],
          lastUpdated: new Date().toLocaleTimeString(),
        }
      })

      // Actualizar datos del clima cada 30 segundos
      const now = new Date()
      if (now.getSeconds() % 30 === 0) {
        setWeatherData((prev) => ({
          ...prev,
          temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() * 2 - 1))),
          humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() * 6 - 3))),
          windSpeed: Math.max(0, Math.min(15, prev.windSpeed + (Math.random() * 2 - 1))),
          lastUpdated: now.toLocaleTimeString(),
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [animationsEnabled])

  const [backendOffline, setBackendOffline] = useState(false)

  const analyzeImage = useCallback(async () => {
    if (!selectedImage && !selectedFile) return;
    setIsAnalyzing(true);
    setBackendOffline(false);
    setLoadingProgress(10);
    try {
      let file = selectedFile;
      if (!file && selectedImage && selectedImage.startsWith("data:")) {
        const arr = selectedImage.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        file = new File([u8arr], "captura.jpg", { type: mime });
      }
      if (!file) {
        setIsAnalyzing(false);
        toast({ title: "Error", description: "No se pudo procesar la imagen.", variant: "destructive" });
        return;
      }
      let progress = 10;
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + Math.random() * 15, 95);
        setLoadingProgress(progress);
      }, 300);
      const { predictImageFromFile, BACKEND_URL_LOCAL } = await import("../lib/predict");
      const result = await predictImageFromFile(file, BACKEND_URL_LOCAL);
      console.log('Respuesta del backend:', result);
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setTimeout(() => {
        setIsAnalyzing(false);
        setLoadingProgress(0);
      }, 400);
      if (result.backendOffline) {
        setBackendOffline(true);
        setAnalysisResult(null);
        return;
      }
      setBackendOffline(false);
      // Si el backend devuelve detections como array, usar la primera detección
      let detection = result;
      if (Array.isArray(result.detections) && result.detections.length > 0) {
        detection = result.detections[0];
      }
      // Emparejar por id, class_name_en o class_name_es
      let disease = null;
      if (detection.id !== undefined) {
        disease = DISEASES.find(d => String(d.id) === String(detection.id));
      }
      if (!disease && detection.class_name_en) {
        disease = DISEASES.find(d => d.class_name_en === detection.class_name_en);
      }
      if (!disease && detection.class_name_es) {
        disease = DISEASES.find(d => d.class_name_es === detection.class_name_es);
      }
      // Imagen procesada (con boxes)
      let processedImage = selectedImage;
      if (result.image_with_boxes) {
        processedImage = result.image_with_boxes.startsWith('data:')
          ? result.image_with_boxes
          : `data:image/jpeg;base64,${result.image_with_boxes}`;
      }
      setAnalysisResult({
        nombre: disease ? disease.nombre_mostrar : (detection.class_name_es || detection.class_name_en || "Desconocido"),
        confianza: detection.confidence || 0,
        planta: disease ? disease.afecta_a.join(", ") : "-",
        estado: detection.class_name_en && detection.class_name_en.toLowerCase().includes("healthy") ? "Saludable" : "Infectada",
        descripcion: disease ? disease.descripcion : "No se encontró información en la base de datos local.",
        recomendaciones: disease ? disease.recomendaciones_organico : [],
        plan_tratamiento: disease ? disease.plan_tratamiento : [],
        link_experto: disease ? disease.link_experto : "",
        imagen: processedImage,
        tipo: disease ? disease.categoria : "-",
      });
      // Determinar status correcto
      const status: "saludable" | "infectada" =
        (detection.class_name_en && detection.class_name_en.toLowerCase().includes("healthy")) ||
        (detection.class_name_es && (
          detection.class_name_es.toLowerCase().includes("sano") ||
          detection.class_name_es.toLowerCase().includes("saludable")
        ))
          ? "saludable"
          : "infectada";
      // Agregar al historial de diagnósticos con tipado correcto
      const newDiagnostic: DiagnosticItem = {
        id: String(Date.now()),
        name: disease ? disease.nombre_mostrar : (detection.class_name_es || detection.class_name_en || "Desconocido"),
        type: disease ? disease.categoria : "-",
        date: new Date().toLocaleDateString(),
        status,
        disease: disease ? disease.nombre_mostrar : (detection.class_name_es || detection.class_name_en || "Desconocido"),
        image: processedImage || "/placeholder.svg?height=100&width=100",
        archived: false,
      };
      setDiagnostics((prev) => [newDiagnostic, ...prev]);
      if (notificationsEnabled) {
        toast({
          title: "Análisis completado",
          description: `Se ha detectado ${disease ? disease.nombre_mostrar : (result.class_name_es || result.class_name_en || "Desconocido")}`,
        });
      }
    } catch (err) {
      setIsAnalyzing(false);
      setBackendOffline(true);
      setAnalysisResult(null);
    }
  }, [selectedImage, selectedFile, notificationsEnabled, toast])

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev)

    if (notificationsEnabled) {
      toast({
        title: "Tema cambiado",
        description: `Tema ${isDarkTheme ? "claro" : "oscuro"} activado.`,
      })
    }
  }, [isDarkTheme, notificationsEnabled, toast])

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled((prev) => !prev)

    if (notificationsEnabled) {
      toast({
        title: "Animaciones",
        description: `Animaciones ${animationsEnabled ? "desactivadas" : "activadas"}.`,
      })
    }
  }, [animationsEnabled, notificationsEnabled, toast])

  const toggleNotifications = useCallback(() => {
    setNotificationsEnabled((prev) => !prev)

    toast({
      title: "Notificaciones",
      description: `Notificaciones ${notificationsEnabled ? "desactivadas" : "activadas"}.`,
    })
  }, [notificationsEnabled, toast])

  const toggleStorage = useCallback(() => {
    setStorageEnabled((prev) => !prev)

    if (notificationsEnabled) {
      toast({
        title: "Almacenamiento local",
        description: `Almacenamiento local ${storageEnabled ? "desactivado" : "activado"}.`,
      })
    }
  }, [storageEnabled, notificationsEnabled, toast])

  const showTreatmentPlan = useCallback(() => {
    toast({
      title: "Plan de tratamiento generado",
      description: "Se ha creado un plan personalizado para tratar la Roña del manzano.",
    })

    // Aquí se podría abrir un modal con el plan detallado
    // Por ahora simulamos con un toast adicional
    setTimeout(() => {
      toast({
        title: "Plan de Tratamiento: Roña del Manzano",
        description:
          "Fase 1: Aplicar fungicida Captan (2g/L) cada 7-10 días. Fase 2: Podar ramas afectadas. Fase 3: Tratamiento preventivo en primavera.",
      })
    }, 1000)
  }, [toast])

  // Actualizar los estilos para usar un fondo azul metálico oscuro
  const bgColor = "bg-[#0a1929]"
  const cardBg = "bg-[#132f4c]/80"
  const cardBorder = "border-[#1e4976]"
  const textColor = "text-[#e7ebf0]"
  const textSecondary = "text-[#b2bac2]"
  const textMuted = "text-[#7a8b9a]"
  const accentColor = "text-[#66b2ff]"
  const buttonBg = "bg-gradient-to-r from-[#1976d2] to-[#0059b2]"
  const buttonHover = "hover:from-[#0059b2] hover:to-[#004c99]"

  // Mantener los efectos existentes para geolocalización, actualizaciones de datos, etc.

  // Actualizar el renderizado del panel principal para incluir todas las métricas
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Widgets superiores desplazables */}
      <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
        <Card className={`${cardBg} backdrop-blur-sm flex-shrink-0 w-60 ${cardBorder}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${textColor}`}>Precisión</h3>
              <Badge className="bg-blue-900/30 text-blue-400">{modelMetrics[0].value}%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardBg} backdrop-blur-sm flex-shrink-0 w-60 ${cardBorder}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${textColor}`}>Diagnósticos</h3>
              <Badge className="bg-blue-900/30 text-blue-400">{diagnostics.length}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardBg} backdrop-blur-sm flex-shrink-0 w-60 ${cardBorder}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${textColor}`}>Ubicación</h3>
              <div className="flex items-center">
                <MapPin className={`h-4 w-4 ${accentColor} mr-1`} />
                <span className={`text-sm ${textSecondary}`}>{weatherData.location.split(",")[0]}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardBg} backdrop-blur-sm flex-shrink-0 w-60 ${cardBorder}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${textColor}`}>Temperatura</h3>
              <div className="flex items-center">
                <ThermometerSun className="h-4 w-4 text-amber-400 mr-1" />
                <span className={`text-sm ${textSecondary}`}>{weatherData.temperature.toFixed(1)}°C</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recursos del sistema */}
      <Card className={`${cardBg} backdrop-blur-sm ${cardBorder}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`${textColor} flex items-center`}>
            <BarChart3 className={`mr-2 h-5 w-5 ${accentColor}`} />
            Estado del Sistema
          </CardTitle>
          <CardDescription className={textMuted}>Monitoreo en tiempo real del rendimiento y recursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className={`text-lg font-medium ${textColor}`}>Rendimiento</h3>
              <div className="space-y-4">
                {systemResources.map((resource) => (
                  <div key={resource.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {resource.name === "CPU" ? (
                          <Cpu className={`h-4 w-4 ${accentColor} mr-2`} />
                        ) : resource.name === "Memoria" ? (
                          <Memory className={`h-4 w-4 ${accentColor} mr-2`} />
                        ) : resource.name === "Almacenamiento" ? (
                          <HardDrive className={`h-4 w-4 ${accentColor} mr-2`} />
                        ) : (
                          <Wifi className={`h-4 w-4 ${accentColor} mr-2`} />
                        )}
                        <p className={`text-sm ${textSecondary}`}>{resource.name}</p>
                      </div>
                      <p className={`text-sm font-medium ${textColor}`}>
                        {resource.value} {resource.unit}
                      </p>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          resource.value / resource.max > 0.8
                            ? "bg-red-500"
                            : resource.value / resource.max > 0.6
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                        style={{ width: `${(resource.value / resource.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-lg font-medium ${textColor}`}>Datos Meteorológicos</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <ThermometerSun className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${textMuted}`}>Temperatura</p>
                      <p className={`text-lg font-medium ${textColor}`}>{weatherData.temperature.toFixed(1)}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <Droplets className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${textMuted}`}>Humedad</p>
                      <p className={`text-lg font-medium ${textColor}`}>{weatherData.humidity.toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className={`text-sm ${textMuted}`}>Condición</p>
                    <p className={`text-lg font-medium ${textColor}`}>{weatherData.condition}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${textMuted} mb-2`}>Pronóstico para fumigación</p>
                    <Badge
                      className={
                        weatherData.condition === "Soleado"
                          ? "bg-green-900/30 text-green-400"
                          : weatherData.condition === "Parcialmente nublado"
                            ? "bg-blue-900/30 text-blue-400"
                            : "bg-amber-900/30 text-amber-400"
                      }
                    >
                      {weatherData.condition === "Soleado"
                        ? "Óptimo"
                        : weatherData.condition === "Parcialmente nublado"
                          ? "Aceptable"
                          : "No recomendado"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas del modelo */}
      <Card className={`${cardBg} backdrop-blur-sm ${cardBorder}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`${textColor} flex items-center`}>
            <Zap className={`mr-2 h-5 w-5 ${accentColor}`} />
            Métricas del Modelo
          </CardTitle>
          <CardDescription className={textMuted}>Rendimiento del modelo de IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modelMetrics.slice(0, 3).map((metric) => (
              <div key={metric.name} className="bg-blue-900/20 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${textMuted}`}>{metric.name}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className={`text-2xl font-bold ${textColor}`}>
                        {metric.value}
                        {metric.unit}
                      </h3>
                      <span
                        className={`text-xs ${
                          metric.change > 0 ? "text-green-400" : metric.change < 0 ? "text-red-400" : textMuted
                        }`}
                      >
                        {metric.change > 0 ? "+" : ""}
                        {metric.change}
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-blue-800/50 flex items-center justify-center">
                    {metric.name === "Precisión" ? (
                      <BarChart3 className={`h-5 w-5 ${accentColor}`} />
                    ) : metric.name === "Muestras procesadas" ? (
                      <Database className={`h-5 w-5 ${accentColor}`} />
                    ) : (
                      <Zap className={`h-5 w-5 ${accentColor}`} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diagnósticos recientes - Movido desde el analizador */}
      <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className={`${textColor} flex items-center`}>
              <AlertCircle className={`mr-2 h-5 w-5 ${accentColor}`} />
              Diagnósticos Recientes
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-[#1e4976] text-[#132f4c] hover:bg-[#132f4c] hover:text-white"
              onClick={() => setActiveSection("diagnostics")}
            >
              Ver Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {diagnostics
            .filter((d) => !d.archived)
            .slice(0, 3)
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`border ${
                  item.status === "infectada"
                    ? "border-amber-900/30 bg-amber-900/10"
                    : "border-emerald-900/30 bg-emerald-900/10"
                } rounded-lg p-3`}
              >
                <div className="flex gap-3">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${textColor} truncate`}>{item.name}</h4>
                        <p
                          className={`text-sm ${
                            item.status === "infectada" ? "text-amber-400" : "text-emerald-400"
                          } truncate`}
                        >
                          {item.status === "infectada" ? item.disease : "Saludable"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "infectada"
                            ? "bg-amber-900/20 text-amber-400 border-amber-900/50"
                            : "bg-emerald-900/20 text-emerald-400 border-emerald-900/50"
                        }
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs ${textMuted}`}>{item.date}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-[#132f4c] hover:text-[#e7ebf0] text-[#e7ebf0]"
                          onClick={() => toggleArchive(item.id)}
                        >
                          <Archive className="h-3 w-3" />
                          <span className="sr-only">Archivar</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-[#132f4c] hover:text-red-400 text-[#e7ebf0]"
                          onClick={() => deleteDiagnostic(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

          {diagnostics.filter((d) => !d.archived).length === 0 && (
            <div className="text-center py-8">
              <div className="inline-block p-3 rounded-full bg-[#132f4c]/50 mb-4">
                <AlertCircle className={`h-6 w-6 ${textMuted}`} />
              </div>
              <h3 className={`text-lg font-medium ${textColor} mb-1`}>No hay diagnósticos</h3>
              <p className={`text-sm ${textMuted}`}>Los diagnósticos aparecerán aquí cuando analices imágenes</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  // Ahora, modificar la función renderAnalyzer para reorganizar en dos columnas
  // Eliminar la sección de diagnósticos recientes y reorganizar el analizador

  // Handler para la subida de archivos de imagen
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setAnalysisResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Estado para mostrar el modal de cámara y guardar el stream
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const captureImage = useCallback(async () => {
    if (!isCameraActive) {
      // Solicitar permisos y mostrar video
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setCameraStream(stream)
        setIsCameraActive(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        toast({
          title: "Permiso denegado",
          description: "No se pudo acceder a la cámara. Por favor acepta el permiso en tu navegador.",
          variant: "destructive",
        })
      }
      return
    }
    // Si la cámara ya está activa, tomar la foto
    if (videoRef.current) {
      const video = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
        setSelectedImage(dataUrl)
        setAnalysisResult(null)
        // Detener la cámara
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop())
          setCameraStream(null)
          setIsCameraActive(false)
        }
        setTimeout(() => {
          analyzeImage()
        }, 100)
        if (notificationsEnabled) {
          toast({
            title: "Imagen capturada",
            description: "La imagen ha sido capturada correctamente.",
          })
        }
      }
    }
  }, [isCameraActive, cameraStream, analyzeImage, notificationsEnabled, toast])

  useEffect(() => {
    if (isCameraActive && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream
    }
  }, [isCameraActive, cameraStream])

  // Estado para mostrar/ocultar el plan de tratamiento en el análisis
  const [showTreatment, setShowTreatment] = useState(false);

  const renderAnalyzer = () => (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className={`${textColor} flex items-center`}>
                <Microscope className={`mr-2 h-5 w-5 ${accentColor}`} />
                Centro de Análisis Avanzado
              </CardTitle>
              <Badge variant="outline" className="bg-[#132f4c]/50 text-[#e7ebf0] border-[#1e4976]">
                IA + OpenCV
              </Badge>
            </div>
            <CardDescription className={textMuted}>
              Análisis de enfermedades en tiempo real con visión computacional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Columna izquierda: Analizador */}
              <div className="space-y-4">
                {!selectedImage ? (
                  <>
                    <Tabs defaultValue="upload" className="w-full">
                      <TabsList className={`grid w-full grid-cols-2 bg-[#132f4c]/50`}>
                        <TabsTrigger
                          value="upload"
                          className={`data-[state=active]:bg-[#1e4976] data-[state=active]:text-white text-[#e7ebf0] hover:text-white`}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Subir
                        </TabsTrigger>
                        <TabsTrigger
                          value="camera"
                          className={`data-[state=active]:bg-[#1e4976] data-[state=active]:text-white text-[#e7ebf0] hover:text-white`}
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Cámara
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="upload" className="mt-4">
                        <div className="flex flex-col items-center gap-4">
                          <label
                            htmlFor="image-upload"
                            className={`border-2 border-dashed border-[#1e4976] hover:bg-[#132f4c]/30 rounded-lg p-8 w-full text-center cursor-pointer transition-colors`}
                          >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Upload className={`mx-auto h-10 w-10 ${textMuted} mb-2`} />
                              <p className={`text-lg font-medium ${textSecondary}`}>Haz clic para subir una imagen</p>
                              <p className={`text-sm ${textMuted}`}>o arrastra y suelta</p>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                              />
                            </motion.div>
                          </label>
                        </div>
                      </TabsContent>

                      <TabsContent value="camera" className="mt-4">
                        <div className="flex flex-col items-center gap-4">
                          {isCameraActive && (
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              className="rounded-lg border-2 border-[#1e4976] mb-4 max-w-full max-h-[40vh]"
                              style={{ width: 400, height: 300 }}
                            />
                          )}
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                            <Button
                              size="lg"
                              className={`w-full text-lg py-6 ${buttonBg} ${buttonHover} text-white`}
                              onClick={captureImage}
                              disabled={isAnalyzing}
                            >
                              <span className="flex items-center">
                                <Camera className="mr-2 h-5 w-5" />
                                {isCameraActive ? "Tomar Foto" : "Abrir cámara"}
                              </span>
                            </Button>
                            {isCameraActive && (
                              <Button variant="outline" className="w-full mt-2" onClick={() => {
                                if (cameraStream) {
                                  cameraStream.getTracks().forEach(track => track.stop())
                                  setCameraStream(null)
                                }
                                setIsCameraActive(false)
                              }}>
                                Cancelar
                              </Button>
                            )}
                          </motion.div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`text-lg font-medium ${textColor}`}>Imagen Original</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1e4976] text-[#112b45] hover:bg-[#132f4c] hover:text-white"
                        onClick={() => {
                          setSelectedImage(null)
                          setAnalysisResult(null)
                        }}
                      >
                        <X className="h-3 w-3 mr-1" /> Cambiar
                      </Button>
                    </div>
                    <div
                      className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 border-[#1e4976]`}
                    >
                      <Image
                        src={selectedImage || "/placeholder.svg"}
                        alt="Imagen seleccionada"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <p className={`text-sm ${textMuted}`}>Resolución</p>
                        <Badge className="bg-[#132f4c]/50 text-[#e7ebf0] border-[#1e4976]">1200 x 1200 px</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-sm ${textMuted}`}>Formato</p>
                        <Badge className="bg-[#132f4c]/50 text-[#e7ebf0] border-[#1e4976]">JPEG</Badge>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button
                        size="lg"
                        className={`w-full text-lg py-6 ${buttonBg} ${buttonHover} text-white`}
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <span className="flex items-center">
                            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                            Analizando...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Microscope className="mr-2 h-5 w-5" />
                            Analizar Imagen
                          </span>
                        )}
                      </Button>

                      {isAnalyzing && (
                        <div className="w-full mt-2">
                          <Progress value={loadingProgress} className="h-2 bg-[#132f4c]">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                          </Progress>
                          <div className={`text-xs text-center mt-1 ${textMuted}`}>
                            {loadingProgress < 30
                              ? "Procesando imagen..."
                              : loadingProgress < 60
                                ? "Identificando planta..."
                                : loadingProgress < 90
                                  ? "Analizando condición..."
                                  : "Finalizando análisis..."}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </div>

              {/* Columna derecha: Resultados */}
              <div className="space-y-4">
                {isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Microscope className={`h-12 w-12 ${accentColor} animate-spin mb-4`} />
                    <h3 className={`text-xl font-medium ${textColor} mb-2`}>Analizando imagen</h3>
                    <p className={`${textMuted} text-center`}>
                      Nuestro modelo de IA está procesando la imagen para detectar enfermedades
                    </p>
                  </div>
                ) : backendOffline ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Microscope className={`h-12 w-12 text-red-400 animate-pulse mb-4`} />
                    <h3 className={`text-xl font-medium text-red-200 mb-2`}>El modelo salió a pensar...</h3>
                    <p className={`text-red-300 text-center`}>
                      En estos momentos, el servicio de IA no está disponible o el backend está apagado.
                    </p>
                  </div>
                ) : analysisResult ? (
                  <div className="space-y-6">
                    {/* Título Imagen Procesada y etiqueta tipo */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-medium ${textColor}`}>Imagen Procesada</h3>
                      {analysisResult.tipo && (
                        <Badge className={
                          analysisResult.tipo === "Hongo"
                            ? "bg-amber-900/50 text-amber-300"
                            : analysisResult.tipo === "Bacteria"
                            ? "bg-blue-900/50 text-blue-300"
                            : analysisResult.tipo === "Virus"
                            ? "bg-red-900/50 text-red-300"
                            : analysisResult.tipo === "Ácaro"
                            ? "bg-purple-900/50 text-purple-300"
                            : analysisResult.tipo === "Deficiencia"
                            ? "bg-green-900/50 text-green-300"
                            : "bg-slate-900/50 text-slate-300"
                        }>
                          {analysisResult.tipo}
                        </Badge>
                      )}
                    </div>
                    {/* Imagen procesada */}
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-amber-900/50">
                      <Image
                        src={analysisResult.imagen || "/placeholder.svg"}
                        alt="Imagen procesada"
                        fill
                        className="object-contain"
                      />
                    </div>
                    {/* Info principal */}
                    <div className="space-y-2">
                      <h3 className={`text-xl font-bold ${textColor}`}>{analysisResult.nombre}</h3>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`text-sm ${accentColor}`}>Confianza: {(analysisResult.confianza * 100).toFixed(1)}%</span>
                        <span className={`text-sm ${textSecondary}`}>
                          Planta: <span className="font-bold">{analysisResult.planta}</span>
                        </span>
                        <span className={`text-sm ${analysisResult.estado === "Saludable" ? "text-emerald-400" : "text-amber-400"}`}>
                          Estado: <span className="font-bold">{analysisResult.estado}</span>
                        </span>
                      </div>
                    </div>
                    {/* Descripción */}
                    <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                      <CardHeader className="pb-2">
                        <CardTitle className={`${textColor}`}>Descripción</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`${textSecondary}`}>{analysisResult.descripcion}</p>
                      </CardContent>
                    </Card>
                    {/* Recomendaciones */}
                    <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                      <CardHeader className="pb-2">
                        <CardTitle className={`${textColor}`}>Recomendaciones</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {Array.isArray(analysisResult.recomendaciones) && analysisResult.recomendaciones.length > 0 ? (
                            analysisResult.recomendaciones.map((rec: string, idx: number) => (
                              <li key={idx} className={`flex items-start text-sm ${textSecondary}`}>
                                <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                                <span>{rec}</span>
                              </li>
                            ))
                          ) : (
                            <li className={`text-sm ${textMuted}`}>No hay recomendaciones disponibles.</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Plan de Tratamiento */}
                    {showTreatment && Array.isArray(analysisResult.plan_tratamiento) && analysisResult.plan_tratamiento.length > 0 && (
                      <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm mt-4`}>
                        <CardHeader className="pb-2">
                          <CardTitle className={`${textColor}`}>Plan de Tratamiento</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysisResult.plan_tratamiento.map((plan: string, idx: number) => (
                              <li key={idx} className={`flex items-start text-sm ${textSecondary}`}>
                                <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                                <span>{plan}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Botones Plan de Tratamiento y Consultar Experto */}
                    {Array.isArray(analysisResult.plan_tratamiento) && analysisResult.plan_tratamiento.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.81">
                        <Button
                          className={`${buttonBg} ${buttonHover} text-white w-full`}
                          onClick={() => setShowTreatment((prev: boolean) => !prev)}
                        >
                          {showTreatment ? "Ocultar Plan de Tratamiento" : "Plan de Tratamiento"}
                        </Button>
                        {analysisResult.link_experto && (
                          <a
                            href={analysisResult.link_experto}
                            className={`${buttonBg} ${buttonHover} text-white w-full flex justify-center items-center rounded-md py-2 text-sm`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultar Experto
                          </a>
                        )}
                      </div>
                    )}

                  </div>
                ) : selectedImage ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Microscope className={`h-12 w-12 ${accentColor} mb-4`} />
                    <h3 className={`text-xl font-medium ${textColor} mb-2`}>Listo para analizar</h3>
                    <p className={`${textMuted} text-center`}>
                      Haz clic en "Analizar Imagen" para comenzar el proceso de detección
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="bg-[#132f4c]/50 p-4 rounded-full inline-block mb-4">
                      <Camera className={`h-10 w-10 ${textMuted}`} />
                    </div>
                    <h3 className={`text-xl font-medium ${textColor} mb-2`}>Ninguna imagen seleccionada</h3>
                    <p className={`${textMuted} text-center max-w-md`}>
                      Sube o captura una imagen de una planta para comenzar el análisis con nuestra red neuronal
                      avanzada.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  // Función para archivar/desarchivar diagnósticos
  const toggleArchive = (id: string) => {
    setDiagnostics((prev) =>
      prev.map((diag) =>
        diag.id === id ? { ...diag, archived: !diag.archived } : diag
      )
    )
    if (notificationsEnabled) {
      toast({
        title: "Diagnóstico actualizado",
        description: "El diagnóstico ha sido " + (diagnostics.find(d => d.id === id)?.archived ? "desarchivado" : "archivado") + ".",
      })
    }
  }

  // Función para eliminar diagnósticos
  const deleteDiagnostic = (id: string) => {
    setDiagnostics((prev) => prev.filter((diag) => diag.id !== id))
    if (notificationsEnabled) {
      toast({
        title: "Diagnóstico eliminado",
        description: "El diagnóstico ha sido eliminado correctamente.",
      })
    }
  }

  // Ahora, modificar la función renderDiagnostics para corregir los botones en el historial de diagnósticos

  const renderDiagnostics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>Historial de Diagnósticos</h2>
          <p className={textMuted}>Gestiona y revisa todos tus análisis anteriores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#1e4976] !text-[#0a1929] hover:bg-[#132f4c] hover:!text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" className="border-[#1e4976] !text-[#0a1929] hover:bg-[#132f4c] hover:!text-white">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="bg-[#132f4c]/50">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-[#1e4976] data-[state=active]:text-white text-[#e7ebf0] hover:text-white"
          >
            Activos ({diagnostics.filter((d) => !d.archived).length})
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="data-[state=active]:bg-[#1e4976] data-[state=active]:text-white text-[#e7ebf0] hover:text-white"
          >
            Archivados ({diagnostics.filter((d) => d.archived).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 space-y-4">
          {diagnostics
            .filter((d) => !d.archived)
            .map((item) => (
              <Card key={item.id} className={`${cardBg} ${cardBorder} backdrop-blur-sm overflow-hidden`}>
                <div
                  className={`h-1 ${
                    item.status === "infectada"
                      ? "bg-gradient-to-r from-amber-500 to-red-500"
                      : "bg-gradient-to-r from-emerald-500 to-green-500"
                  }`}
                />
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-32 h-32 md:h-auto rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className={`text-lg font-medium ${textColor}`}>{item.name}</h4>
                          <p
                            className={`text-sm ${item.status === "infectada" ? "text-amber-400" : "text-emerald-400"}`}
                          >
                            {item.status === "infectada" ? item.disease : "Saludable"}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "infectada"
                              ? "bg-amber-900/20 text-amber-400 border-amber-900/50"
                              : "bg-emerald-900/20 text-emerald-400 border-emerald-900/50"
                          }
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <p className={`text-sm ${textMuted} mb-3`}>Analizado el {item.date}</p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          className="border-[#1e4976] text-[#132f4c] hover:bg-[#132f4c] hover:text-white"
                          onClick={() => {
                            setSelectedDiagnostic(item)
                            setShowDiagnosticDetails(true)
                          }}
                        >
                          Ver Detalles
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#132f4c] hover:text-[#e7ebf0] text-[#e7ebf0]"
                            onClick={() => toggleArchive(item.id)}
                            title="Archivar"
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#132f4c] hover:text-red-400 text-[#e7ebf0]"
                            onClick={() => deleteDiagnostic(item.id)}
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {diagnostics.filter((d) => !d.archived).length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-[#132f4c]/50 mb-4">
                <AlertCircle className={`h-8 w-8 ${textMuted}`} />
              </div>
              <h3 className={`text-xl font-medium ${textColor} mb-2`}>No hay diagnósticos activos</h3>
              <p className={`${textMuted} max-w-md mx-auto`}>
                Los diagnósticos aparecerán aquí cuando analices imágenes. Puedes usar el analizador para comenzar.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived" className="mt-4 space-y-4">
          {diagnostics
            .filter((d) => d.archived)
            .map((item) => (
              <Card key={item.id} className={`${cardBg} ${cardBorder} backdrop-blur-sm overflow-hidden opacity-70`}>
                <div
                  className={`h-1 ${
                    item.status === "infectada"
                      ? "bg-gradient-to-r from-amber-500 to-red-500"
                      : "bg-gradient-to-r from-emerald-500 to-green-500"
                  }`}
                />
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-32 h-32 md:h-auto rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className={`text-lg font-medium ${textColor}`}>{item.name}</h4>
                          <p
                            className={`text-sm ${item.status === "infectada" ? "text-amber-400" : "text-emerald-400"}`}
                          >
                            {item.status === "infectada" ? item.disease : "Saludable"}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "infectada"
                              ? "bg-amber-900/20 text-amber-400 border-amber-900/50"
                              : "bg-emerald-900/20 text-emerald-400 border-emerald-900/50"
                          }
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <p className={`text-sm ${textMuted} mb-3`}>Analizado el {item.date}</p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          className="border-[#1e4976] text-[#132f4c] hover:bg-[#132f4c] hover:text-white"
                          onClick={() => {
                            setSelectedDiagnostic(item)
                            setShowDiagnosticDetails(true)
                          }}
                        >
                          Ver Detalles
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#132f4c] hover:text-[#e7ebf0] text-[#e7ebf0]"
                            onClick={() => toggleArchive(item.id)}
                            title="Desarchivar"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-[#132f4c] hover:text-red-400 text-[#e7ebf0]"
                            onClick={() => deleteDiagnostic(item.id)}
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {diagnostics.filter((d) => d.archived).length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-[#132f4c]/50 mb-4">
                <Database className={`h-8 w-8 ${textMuted}`} />
              </div>
              <h3 className={`text-xl font-medium ${textColor} mb-2`}>No hay diagnósticos archivados</h3>
              <p className={`${textMuted} max-w-md mx-auto`}>
                Los diagnósticos archivados aparecerán aquí. Puedes archivar diagnósticos para mantener organizado tu
                historial.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderDiseaseLibrary = () => (
    <div className="space-y-6">
      {showDiseaseDetails && selectedDisease ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className={`text-2xl font-bold ${textColor}`}>{selectedDisease.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-blue-900/30 text-blue-400">{selectedDisease.type}</Badge>
                <span className={textMuted}>Afecta a: {selectedDisease.fruit}</span>
                <Badge
                  className={
                    selectedDisease.severity === "Alta"
                      ? "bg-red-900/30 text-red-400"
                      : selectedDisease.severity === "Media"
                        ? "bg-amber-900/30 text-amber-400"
                        : "bg-green-900/30 text-green-400"
                  }
                >
                  Severidad: {selectedDisease.severity}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-[#1e4976] !text-[#0a1929] hover:bg-[#132f4c] hover:text-white"
              onClick={() => {
                setShowDiseaseDetails(false)
                setSelectedDisease(null)
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src={selectedDisease.image || "/placeholder.svg"}
                  alt={selectedDisease.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <Badge
                    className={`bg-${selectedDisease.type === "Hongo" ? "amber" : selectedDisease.type === "Bacteria" ? "blue" : selectedDisease.type === "Virus" ? "red" : selectedDisease.type === "Mite" ? "purple" : "green"}-900/50 text-${selectedDisease.type === "Hongo" ? "amber" : selectedDisease.type === "Bacteria" ? "blue" : selectedDisease.type === "Virus" ? "red" : selectedDisease.type === "Mite" ? "purple" : "green"}-300`}
                  >
                    {selectedDisease.type}
                  </Badge>
                  <h3 className="text-white text-xl font-bold mt-2">{selectedDisease.name}</h3>
                  <p className="text-white/80 text-sm">Afecta a: {selectedDisease.fruit}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${textSecondary}`}>{selectedDisease.description}</p>
                </CardContent>
              </Card>

              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Síntomas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedDisease.symptoms.map((symptom: string, index: number) => (
                      <li key={index} className={`flex items-start text-sm ${textSecondary}`}>
                        <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Recomendaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="organic">
                    <TabsList className="bg-[#132f4c]/50">
                      <TabsTrigger
                        value="organic"
                        className="data-[state=active]:bg-[#1e4976] data-[state=active]:text-white text-[#e7ebf0] hover:text-white"
                      >
                        Control Orgánico
                      </TabsTrigger>
                      <TabsTrigger
                        value="chemical"
                        className="data-[state=active]:bg-[#1e4976] data-[state=active]:text-white text-[#e7ebf0] hover:text-white"
                      >
                        Tratamiento Químico
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="organic" className="mt-4 space-y-4">
                      <ul className="space-y-2">
                        {selectedDisease.type === "Hongo" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar extracto de cola de caballo (rico en sílice) como preventivo</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar bicarbonato de sodio diluido (1 cucharada por litro de agua)</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar aceite de neem como fungicida natural</span>
                            </li>
                          </>
                        ) : selectedDisease.type === "Bacteria" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar infusión de ajo y cebolla como bactericida natural</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar purín de ortiga fermentado</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar compost de calidad para fortalecer la resistencia natural</span>
                            </li>
                          </>
                        ) : selectedDisease.type === "Virus" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Control biológico de insectos vectores con depredadores naturales</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar extractos vegetales repelentes (ajo, chile, ruda)</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Eliminar plantas infectadas para prevenir propagación</span>
                            </li>
                          </>
                        ) : selectedDisease.type === "Mite" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Liberar ácaros depredadores como Phytoseiulus persimilis</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar jabón potásico diluido en agua</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar aceite de neem como repelente natural</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar compost rico en el nutriente deficiente</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar abonos verdes para mejorar la calidad del suelo</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar té de compost como fertilizante natural</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </TabsContent>

                    <TabsContent value="chemical" className="mt-4 space-y-4">
                      <ul className="space-y-2">
                                               {selectedDisease.type === "Hongo" ? (
                          <>
                                                       <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar fungicidas a base de cobre (oxicloruro de cobre)</span>
                            </li>
                            <li className={`flex items-start text-sm ${accentColor} mt-0.5 mr-1 flex-shrink-0`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar fungicidas sistémicos como Difenoconazol</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar fungicidas protectores como Mancozeb</span>
                            </li>
                          </>
                        ) : selectedDisease.type === "Bacteria" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar bactericidas a base de cobre (sulfato de cobre)</span>
                            </li>
                            <li className={`flex items-start text-sm ${accentColor} mt-0.5 mr-1 flex-shrink-0`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar antibióticos agrícolas como la estreptomicina</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar compuestos de amonio cuaternario</span>
                            </li>
                          </>
                        ) : selectedDisease.type === "Virus" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar insecticidas para controlar vectores (pulgones, trips)</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar aceites minerales para prevenir transmisión</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>No existe tratamiento químico directo para virus vegetales</span>
                            </li>
                          </>
                        ) : selectedDisease.type === "Mite" ? (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar acaricidas específicos como Abamectina</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar azufre en polvo o líquido</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar aceites minerales de verano</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar fertilizantes foliares con el nutriente deficiente</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Utilizar quelatos específicos (EDDHA para hierro, etc.)</span>
                            </li>
                            <li className={`flex items-start text-sm ${textSecondary}`}>
                              <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                              <span>Aplicar correctores de pH si la deficiencia es por bloqueo</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`${textColor}`}>Qué lo causó</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${textSecondary}`}>
                      {selectedDisease.type === "Hongo"
                        ? "Hongos patógenos que se desarrollan en condiciones de alta humedad y temperaturas moderadas. La infección se propaga por esporas transportadas por el viento, agua o insectos."
                        : selectedDisease.type === "Bacteria"
                          ? "Bacterias patógenas que ingresan a través de heridas, estomas o por insectos vectores. Se favorecen en ambientes húmedos y cálidos, propagándose rápidamente en condiciones de lluvia."
                          : selectedDisease.type === "Virus"
                            ? "Virus transmitidos principalmente por insectos vectores como pulgones, trips o mosca blanca. También pueden transmitirse por herramientas contaminadas o injertos."
                            : selectedDisease.type === "Mite"
                              ? "Ácaros microscópicos que se alimentan de la savia de las plantas. Proliferan en condiciones secas y cálidas, y su población puede aumentar rápidamente en ausencia de depredadores naturales."
                              : "Falta de nutrientes esenciales en el suelo, pH inadecuado que bloquea la absorción de nutrientes, o daño en las raíces que impide la correcta absorción de elementos minerales."}
                    </p>
                  </CardContent>
                </Card>

                <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`${textColor}`}>Medidas preventivas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedDisease.type === "Hongo" ? (
                        <>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Mantener buena circulación de aire entre plantas</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Evitar mojar el follaje al regar</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Eliminar y destruir hojas y frutos infectados</span>
                          </li>
                        </>
                      ) : selectedDisease.type === "Bacteria" ? (
                        <>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Utilizar herramientas desinfectadas</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Evitar trabajar con plantas cuando están mojadas</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Utilizar variedades resistentes cuando sea posible</span>
                          </li>
                        </>
                      ) : selectedDisease.type === "Virus" ? (
                        <>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Controlar poblaciones de insectos vectores</span>
                          </li>
                          <li className={`flex items-start text-sm ${accentColor} mt-0.5 mr-1 flex-shrink-0`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Utilizar semillas y material de propagación certificado</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Desinfectar herramientas entre plantas</span>
                          </li>
                        </>
                      ) : selectedDisease.type === "Mite" ? (
                        <>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Mantener niveles adecuados de humedad</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Fomentar la presencia de enemigos naturales</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Inspeccionar regularmente las plantas</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Realizar análisis de suelo periódicos</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Mantener niveles adecuados de materia orgánica</span>
                          </li>
                          <li className={`flex items-start text-sm ${textSecondary}`}>
                            <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                            <span>Aplicar enmiendas para corregir el pH si es necesario</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className={`text-2xl font-bold ${textColor}`}>Librería de Enfermedades</h2>
              <p className={textMuted}>Explora información detallada sobre diversas enfermedades de las plantas</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#1e4976] !text-[#0a1929] hover:bg-[#132f4c] hover:!text-white">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button variant="outline" className="border-[#1e4976] !text-[#0a1929] hover:bg-[#132f4c] hover:!text-white">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar enfermedad..."
                className={`w-full px-4 py-2 rounded-md border border-[#1e4976] bg-[#132f4c]/50 text-[#e7ebf0] focus:outline-none focus:border-[#66b2ff]`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                aria-label="Filtrar por categoría"
                className={`px-4 py-2 rounded-md border border-[#1e4976] bg-[#132f4c]/50 text-[#e7ebf0] focus:outline-none focus:border-[#66b2ff]`}
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value === "" ? null : e.target.value)}
              >
                <option value="">Todas las categorías</option>
                <option value="Hongo">Hongo</option>
                <option value="Bacteria">Bacteria</option>
                <option value="Virus">Virus</option>
                <option value="Ácaro">Ácaro</option>
                <option value="Deficiencia">Deficiencia</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.length > 0 ? (
              filteredDiseases.map((disease) => (
                <div key={disease.id} className="relative overflow-hidden rounded-lg shadow-lg bg-[#132f4c]/80 cursor-pointer hover:scale-[1.02] transition-transform">
                  <div className="relative h-48">
                    <Image
                      src={disease.image || "/placeholder.svg"}
                      alt={disease.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <Badge
                        className={`${
                          disease.type === "Hongo"
                            ? "bg-amber-900/50 text-amber-300"
                            : disease.type === "Bacteria"
                            ? "bg-blue-900/50 text-blue-300"
                            : disease.type === "Virus"
                            ? "bg-red-900/50 text-red-300"
                            : disease.type === "Ácaro"
                            ? "bg-purple-900/50 text-purple-300"
                            : disease.type === "Deficiencia"
                            ? "bg-green-900/50 text-green-300"
                            : "bg-slate-900/50 text-slate-300"
                        }`}
                      >
                        {disease.type}
                      </Badge>
                      <h3 className="text-white text-xl font-bold mt-2">{disease.name}</h3>
                      <p className="text-white/80 text-sm">Afecta a: {disease.fruit}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={`text-sm ${textSecondary} mb-4 line-clamp-2`}>{disease.description}</p>
                    <Button
                      className={`${buttonBg} ${buttonHover} text-white w-full`}
                      onClick={() => {
                        setSelectedDisease(disease)
                        setShowDiseaseDetails(true)
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 col-span-full">
                <div className="inline-block p-4 rounded-full bg-[#132f4c]/50 mb-4">
                  <BookOpen className={`h-8 w-8 ${textMuted}`} />
                </div>
                <h3 className={`text-xl font-medium ${textColor} mb-2`}>No se encontraron enfermedades</h3>
                <p className={`${textMuted} max-w-md mx-auto`}>
                  Intenta ajustar los filtros o la búsqueda para encontrar la información que necesitas.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  // Actualizar el renderizado principal para usar el nuevo diseño
  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full border-b border-[#1e4976] bg-[#0a1929]/80 backdrop-blur-sm`}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
              onClick={onExit}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#66b2ff]">Espacio Experimental</h1>
              <p className={textMuted}>Centro de monitoreo avanzado</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="text-[#e7ebf0] hover:text-white md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#e7ebf0] hover:text-white"
              onClick={() => setShowHelpDialog(true)}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Ayuda</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#e7ebf0] hover:text-white"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configuración</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#e7ebf0] hover:text-white"
              onClick={() => setIsDarkTheme(!isDarkTheme)}
            >
              {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Cambiar tema</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`${bgColor} h-full w-64 p-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h2 className={`text-xl font-bold ${textColor}`}>Menú</h2>
                </div>
                <nav className="space-y-2">
                  <Button
                    variant={activeSection === "dashboard" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "dashboard" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => {
                      setActiveSection("dashboard")
                      setShowMobileMenu(false)
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Panel Principal
                  </Button>
                  <Button
                    variant={activeSection === "analyzer" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "analyzer" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => {
                      setActiveSection("analyzer")
                      setShowMobileMenu(false)
                    }}
                  >
                    <Microscope className="mr-2 h-5 w-5" />
                    Analizador
                  </Button>
                  <Button
                    variant={activeSection === "diagnostics" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "diagnostics" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => {
                      setActiveSection("diagnostics")
                      setShowMobileMenu(false)
                    }}
                  >
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Diagnósticos
                  </Button>
                  <Button
                    variant={activeSection === "diseases" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "diseases" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => {
                      setActiveSection("diseases")
                      setShowMobileMenu(false)
                    }}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Librería de Enfermedades
                  </Button>
                </nav>
                <Separator className="my-4 bg-[#1e4976]" />
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm font-medium ${textColor}`}>Estado del Sistema</p>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse" />
                      <p className={`text-sm ${textSecondary}`}>Operativo</p>
                    </div>
                  </div>

                  <div>
                    <p className={`text-sm font-medium ${textColor}`}>Ubicación</p>
                    <div className="flex items-center mt-2">
                      <MapPin className={`h-4 w-4 ${accentColor} mr-2`} />
                      <p className={`text-sm ${textSecondary}`}>{weatherData.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-[#1e4976] text-[#e7ebf0] hover:bg-[#132f4c] hover:text-white"
                    onClick={() => {
                      setShowMobileMenu(false)
                      setShowSettingsDialog(true)
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar (visible en desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm sticky top-20`}>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeSection === "dashboard" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "dashboard" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => setActiveSection("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Panel Principal
                  </Button>
                  <Button
                    variant={activeSection === "analyzer" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "analyzer" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => setActiveSection("analyzer")}
                  >
                    <Microscope className="mr-2 h-5 w-5" />
                    Analizador
                  </Button>
                  <Button
                    variant={activeSection === "diagnostics" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "diagnostics" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => setActiveSection("diagnostics")}
                  >
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Diagnósticos
                  </Button>
                  <Button
                    variant={activeSection === "diseases" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === "diseases" ? buttonBg : "text-[#e7ebf0] hover:text-white hover:bg-[#132f4c]"
                    }`}
                    onClick={() => setActiveSection("diseases")}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Librería de Enfermedades
                  </Button>
                </nav>

                <Separator className="my-4 bg-[#1e4976]" />

                <div className="space-y-4">
                  <div>
                    <p className={`text-sm font-medium ${textColor}`}>Estado del Sistema</p>
                    <div className="flex items-center mt-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse" />
                      <p className={`text-sm ${textSecondary}`}>Operativo</p>
                    </div>
                  </div>

                  <div>
                    <p className={`text-sm font-medium ${textColor}`}>Ubicación</p>
                    <div className="flex items-center mt-2">
                      <MapPin className={`h-4 w-4 ${accentColor} mr-2`} />
                      <p className={`text-sm ${textSecondary}`}>{weatherData.location}</p>
                    </div>
                  </div>

                  <div>
                    <p className={`text-sm font-medium ${textColor}`}>Última Actualización</p>
                    <p className={`text-sm ${textSecondary} mt-1`}>{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeSection === "dashboard" && renderDashboard()}
            {activeSection === "analyzer" && renderAnalyzer()}
            {activeSection === "diagnostics" && renderDiagnostics()}
            {activeSection === "diseases" && renderDiseaseLibrary()}
          </div>
        </div>
      </main>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="bg-[#0a1929]/95 backdrop-blur-md border-[#1e4976] text-[#e7ebf0]">
          <DialogHeader>
            <DialogTitle className="text-[#66b2ff]">Configuración</DialogTitle>
            <DialogDescription className="text-[#7a8b9a]">
              Personaliza tu experiencia en el espacio experimental
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#e7ebf0]">Tema Oscuro</Label>
                <p className="text-sm text-[#7a8b9a]">Cambia entre tema claro y oscuro</p>
              </div>
              <Switch checked={isDarkTheme} onCheckedChange={() => setIsDarkTheme(!isDarkTheme)} />
            </div>
            <Separator className="bg-[#1e4976]" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#e7ebf0]">Animaciones</Label>
                <p className="text-sm text-[#7a8b9a]">Habilitar animaciones y actualizaciones en tiempo real</p>
              </div>
              <Switch checked={animationsEnabled} onCheckedChange={toggleAnimations} />
            </div>
            <Separator className="bg-[#1e4976]" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#e7ebf0]">Notificaciones</Label>
                <p className="text-sm text-[#7a8b9a]">Recibir notificaciones sobre análisis y actualizaciones</p>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
            </div>
            <Separator className="bg-[#1e4976]" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[#e7ebf0]">Almacenamiento Local</Label>
                <p className="text-sm text-[#7a8b9a]">Guardar configuraciones y diagnósticos en el navegador</p>
              </div>
              <Switch checked={storageEnabled} onCheckedChange={toggleStorage} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className={`${buttonBg} ${buttonHover} text-white`} onClick={() => setShowSettingsDialog(false)}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="bg-[#0a1929]/95 backdrop-blur-md border-[#1e4976] text-[#e7ebf0]">
          <DialogHeader>
            <DialogTitle className="text-[#66b2ff]">Ayuda del Espacio Experimental</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#e7ebf0]">¿Qué es el Espacio Experimental?</h3>
              <p className="text-sm mt-1 text-[#b2bac2]">
                El Espacio Experimental es un entorno avanzado para analizar enfermedades en frutas utilizando
                inteligencia artificial. Aquí puedes subir imágenes, recibir diagnósticos y acceder a información
                detallada sobre enfermedades comunes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#e7ebf0]">¿Cómo analizar una imagen?</h3>
              <p className="text-sm mt-1 text-[#b2bac2]">
                1. Ve a la sección "Analizador"
                <br />
                2. Sube una imagen o captura una foto
                <br />
                3. Haz clic en "Analizar Imagen"
                <br />
                4. Revisa los resultados y recomendaciones
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#e7ebf0]">Funciones Principales</h3>
              <ul className="text-sm mt-1 space-y-1 text-[#b2bac2]">
                <li>• Panel Principal: Métricas y estado del sistema en tiempo real</li>
                <li>• Analizador: Detecta enfermedades en imágenes de frutas</li>
                <li>• Diagnósticos: Historial de análisis realizados</li>
                <li>• Librería de Enfermedades: Información sobre enfermedades comunes</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className={`${buttonBg} ${buttonHover} text-white`} onClick={() => setShowHelpDialog(false)}>
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diagnostic Details Dialog */}
      <Dialog open={showDiagnosticDetails} onOpenChange={setShowDiagnosticDetails}>
        <DialogContent className="bg-[#0a1929]/95 backdrop-blur-md border-[#1e4976] text-[#e7ebf0] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#66b2ff] text-2xl">Detalles del Diagnóstico</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-amber-900/50 max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent z-10"></div>
                <Image
                  src={selectedDiagnostic?.image || "/placeholder.svg"}
                  alt="Imagen procesada"
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <p className="text-white font-bold text-lg">Roña del manzano</p>
                  <p className="text-amber-200 text-sm">Confianza: 98.7%</p>
                </div>
              </div>

              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Información de la muestra</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${textMuted}`}>Planta</p>
                      <p className={`font-medium ${textColor}`}>Manzana</p>
                    </div>
                    <div>
                      <p className={`text-sm ${textMuted}`}>Estado</p>
                      <p className="font-medium text-amber-400">Infectada</p>
                    </div>
                    <div>
                      <p className={`text-sm ${textMuted}`}>Fecha de análisis</p>
                      <p className={`font-medium ${textColor}`}>{selectedDiagnostic?.date || "Hoy"}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${textMuted}`}>Tipo</p>
                      <p className={`font-medium ${textColor}`}>{selectedDiagnostic?.type || "Hongo"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${textSecondary}`}>
                    La roña del manzano es una enfermedad fúngica causada por Venturia inaequalis. Se caracteriza por
                    lesiones oscuras y escamosas en la superficie de la fruta.
                  </p>
                </CardContent>
              </Card>

              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Recomendaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className={`flex items-start text-sm ${textSecondary}`}>
                      <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                      <span>Aplicar fungicidas preventivos al inicio de la temporada</span>
                    </li>
                    <li className={`flex items-start text-sm ${textSecondary}`}>
                      <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                      <span>Podar y destruir hojas infectadas para reducir la fuente de inóculo</span>
                    </li>
                    <li className={`flex items-start text-sm ${textSecondary}`}>
                      <ChevronRight className={`h-4 w-4 ${accentColor} mt-0.5 mr-1 flex-shrink-0`} />
                      <span>Mantener buena circulación de aire en el huerto</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`${cardBg} ${cardBorder} backdrop-blur-sm`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`${textColor}`}>Plan de Tratamiento Detallado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className={`font-medium ${textColor}`}>Fase 1: Tratamiento Inicial</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Aplicar fungicida Captan (2g/L) cada 7-10 días durante las primeras 3 semanas.
                    </p>
                  </div>
                  <Separator className="bg-[#1e4976]" />
                  <div className="space-y-2">
                    <h4 className={`font-medium ${textColor}`}>Fase 2: Control Cultural</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Podar y eliminar todas las ramas y hojas afectadas. Quemar o desechar lejos del huerto.
                    </p>
                  </div>
                  <Separator className="bg-[#1e4976]" />
                  <div className="space-y-2">
                    <h4 className={`font-medium ${textColor}`}>Fase 3: Prevención</h4>
                    <p className={`text-sm ${textSecondary}`}>
                      Aplicar tratamiento preventivo en primavera antes de la apertura de yemas con cobre.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2 pb-4">
                <Button
                  variant="outline"
                  className="border-[#1e4976] text-[#132f4c] hover:bg-[#132f4c] hover:text-white"
                  onClick={() => setShowDiagnosticDetails(false)}
                >
                  Cerrar
                </Button>
                <Button
                  className={`${buttonBg} ${buttonHover} text-white`}
                  onClick={() => window.open("https://es.wikipedia.org/wiki/Wikipedia:Portada", "_blank")}
                >
                  Consultar Experto
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#132f4c] rounded-lg p-4 flex flex-col items-center relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-lg border-2 border-[#1e4976] mb-4 max-w-full max-h-[60vh]"
              style={{ width: 400, height: 300 }}
            />
            <Button className={`${buttonBg} ${buttonHover} text-white w-full mb-2`} onClick={captureImage}>
              <span className="flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                {isCameraActive ? "Tomar Foto" : "Abrir cámara"}
              </span>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => {
              if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop())
                setCameraStream(null)
              }
              setIsCameraActive(false)
            }}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Mantener las funciones auxiliares existentes como Droplets, etc.
function Droplets(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  )
}
