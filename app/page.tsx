"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trees, Droplets, Bird, TrendingUp, Users, DollarSign, Heart, Shield, Leaf, Bug, Lock } from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [donationType, setDonationType] = useState("monthly")
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [customAmount, setCustomAmount] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDonate = () => {
    alert("Спасибо за вашу поддержку! Ваше пожертвование помогает спасти планету.")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-green-600" />
            <span className="text-xl font-semibold text-gray-900">EarthKeepers</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#mission" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Миссия
            </a>
            <a href="#impact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Влияние
            </a>
            <a href="#donate" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Помочь
            </a>
          </div>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 transition-all duration-300"
          >
            Поддержать
          </Button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url(/misty-forest-sunrise-golden-rays-through-ancient-tr.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: Math.max(0.3, 1 - scrollY / 1000),
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight leading-none">
            Спасем
            <br />
            <span className="text-green-400">нашу планету</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            Каждое действие имеет значение. Присоединяйтесь к движению за будущее Земли.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("donation-section")}
              className="bg-green-600 hover:bg-green-700 text-white text-base px-10 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-medium"
            >
              Начать помогать
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("problems-section")}
              className="border-2 border-white text-white hover:bg-white/10 text-base px-10 py-6 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium bg-transparent"
            >
              Узнать больше
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/90 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems-section" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">Три главные угрозы</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Наша планета сталкивается с беспрецедентными вызовами. Но вместе мы можем изменить ситуацию.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Trees,
                title: "Вырубка лесов",
                stat: "6,7 млн гектаров в 2024",
                description: "Рекордная потеря тропических лесов за два десятилетия",
                image: "/deforestation-cut-trees-destroyed-forest-logging.jpg",
                color: "green",
              },
              {
                icon: Droplets,
                title: "Загрязнение океана",
                stat: "8М тонн в год",
                description: "Миллионы тонн пластика превращают океаны в свалки",
                image: "/ocean-pollution-plastic-waste-garbage-water.jpg",
                color: "blue",
              },
              {
                icon: Bird,
                title: "Вымирание видов",
                stat: "117× быстрее",
                description: "Скорость исчезновения видов в 117 раз выше естественной",
                image: "/endangered-species-wildlife-extinction-habitat-loss.jpg",
                color: "amber",
              },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="relative h-96 rounded-3xl overflow-hidden mb-6 shadow-2xl">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full bg-${item.color}-500 flex items-center justify-center`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                    <div className="text-sm font-semibold text-green-300 mb-2">{item.stat}</div>
                    <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/deforestation-cut-trees-destroyed-forest-logging.jpg"
            alt="Вырубка лесов"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <div className="inline-flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 shadow-2xl">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Критическая ситуация</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-none tracking-tight">
            Амазония горит.
            <br />
            Прямо сейчас.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-6xl font-black text-red-400 mb-4">6,7М</div>
              <div className="text-white text-xl font-semibold mb-3">гектаров потеряно в 2024</div>
              <div className="text-white/80 leading-relaxed">
                Почти вдвое больше, чем в 2023. Самая масштабная потеря за 20 лет
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-6xl font-black text-orange-400 mb-4">5×</div>
              <div className="text-white text-xl font-semibold mb-3">больше пожаров</div>
              <div className="text-white/80 leading-relaxed">
                В 2024 году пожары сожгли в 5 раз больше лесов, чем годом ранее
              </div>
            </div>
          </div>
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-4">Территория размером с Коста-Рику</div>
                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  сгорела только в августе 2024 года. Каждую минуту исчезает участок леса размером с{" "}
                  <strong className="text-red-400">27 футбольных полей</strong>.
                </p>
                <div className="bg-red-500/20 rounded-2xl p-6 border-l-4 border-red-500">
                  <div className="text-3xl font-black text-red-300 mb-2">3,1 гигатонны CO₂</div>
                  <p className="text-white/90">
                    выброшено в атмосферу. Амазония превратилась из поглотителя углерода в крупнейший источник выбросов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/endangered-species-wildlife-extinction-habitat-loss.jpg"
            alt="Исчезающие виды"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm text-black px-6 py-3 rounded-full mb-8 shadow-2xl">
            <Bug className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-wider">Биоразнообразие под угрозой</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-16 text-white leading-none tracking-tight">
            Мы теряем тех,
            <br />
            кто не может говорить
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-500/20 to-red-900/20 backdrop-blur-md rounded-3xl p-8 border border-red-500/30 shadow-2xl">
              <div className="text-7xl font-black text-red-400 mb-4">3,543</div>
              <div className="text-white text-lg font-semibold">вида позвоночных исчезли с 1900 года</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-900/20 backdrop-blur-md rounded-3xl p-8 border border-orange-500/30 shadow-2xl">
              <div className="text-7xl font-black text-orange-400 mb-4">70%</div>
              <div className="text-white text-lg font-semibold">сокращение популяций за 55 лет</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-900/20 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
              <div className="text-7xl font-black text-amber-400 mb-4">117×</div>
              <div className="text-white text-lg font-semibold">скорость вымирания выше нормы</div>
            </div>
          </div>

          <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Что мы теряем</h3>
                <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
                  <p>
                    С 1900 года с лица Земли исчезло <strong className="text-white">3,543 вида позвоночных</strong>.
                    Каждое из этих существ — результат миллионов лет эволюции.
                  </p>
                  <p>
                    <strong className="text-white">70% популяций</strong> диких животных сократились за последние 55
                    лет. На планете в три раза меньше животных, чем в 1970-х.
                  </p>
                  <p>
                    К 2050 году исчезнет еще <strong className="text-amber-400">543 вида</strong>. Тигры, слоны,
                    орангутанги, морские черепахи — их больше никогда не будет.
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 rounded-2xl p-8 border-l-4 border-red-500 mb-6">
                  <div className="text-5xl font-black text-red-400 mb-3">117×</div>
                  <p className="text-white text-xl font-semibold mb-3">быстрее естественной скорости</p>
                  <p className="text-gray-300 leading-relaxed">
                    Скорость исчезновения видов в 117 раз превышает естественный уровень вымирания
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-lg text-gray-300 italic leading-relaxed">
                    "Когда исчезает последний представитель вида, мы теряем целую ветвь древа жизни, которое никогда не
                    вырастет снова."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donation-section" className="py-32 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">Поддержите миссию</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Каждый вклад приближает нас к спасению планеты
            </p>
          </div>

          <div className="p-10 rounded-3xl shadow-2xl border-0 bg-white">
            <div className="flex justify-center gap-3 mb-10">
              <button
                type="button"
                onClick={() => {
                  console.log("[v0] Donation type changed to onetime")
                  setDonationType("onetime")
                }}
                className={`rounded-full px-8 py-6 text-base font-medium transition-all duration-300 cursor-pointer z-20 relative ${
                  donationType === "onetime"
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300"
                }`}
              >
                Единоразово
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log("[v0] Donation type changed to monthly")
                  setDonationType("monthly")
                }}
                className={`rounded-full px-8 py-6 text-base font-medium transition-all duration-300 cursor-pointer z-20 relative ${
                  donationType === "monthly"
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300"
                }`}
              >
                Ежемесячно
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { amount: 10, impact: "5 деревьев" },
                { amount: 25, impact: "15 деревьев" },
                { amount: 50, impact: "30 деревьев" },
                { amount: 100, impact: "70 деревьев" },
              ].map((option) => (
                <button
                  key={option.amount}
                  onClick={() => {
                    console.log("[v0] Clicked amount:", option.amount)
                    setSelectedAmount(option.amount)
                    setCustomAmount("")
                  }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-center font-semibold cursor-pointer hover:cursor-pointer z-10 ${
                    selectedAmount === option.amount && !customAmount
                      ? "border-green-600 bg-green-600 text-white scale-105 shadow-2xl ring-4 ring-green-200"
                      : "border-gray-300 bg-white hover:border-green-500 hover:bg-green-50 shadow-lg hover:shadow-xl hover:scale-105"
                  }`}
                  style={{ touchAction: "manipulation" }}
                  type="button"
                >
                  <div
                    className={`text-3xl font-bold mb-2 pointer-events-none ${
                      selectedAmount === option.amount && !customAmount ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${option.amount}
                  </div>
                  <div
                    className={`text-sm font-medium pointer-events-none ${
                      selectedAmount === option.amount && !customAmount ? "text-green-100" : "text-gray-600"
                    }`}
                  >
                    {option.impact}
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-8 relative z-20">
              <label className="block text-sm font-medium text-gray-700 mb-3">Другая сумма</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  console.log("[v0] Custom amount changed:", e.target.value)
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                placeholder="Введите сумму"
                className="w-full p-5 text-lg rounded-2xl border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-colors cursor-text"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                console.log("[v0] Donate button clicked")
                handleDonate()
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-7 rounded-full shadow-xl transition-all duration-300 hover:scale-105 font-semibold cursor-pointer flex items-center justify-center gap-2 relative z-20"
            >
              <Heart className="w-5 h-5" />
              Помочь сейчас
            </button>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Безопасный платеж</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>SSL защита</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-7 h-7 text-green-500" />
                <span className="text-xl font-semibold">EarthKeepers</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Сохраняем планету для будущих поколений через действия сегодня
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">О нас</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Наша миссия
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Команда
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Отчеты
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@earthkeepers.org</li>
                <li>+7 (495) 123-45-67</li>
                <li>Москва, Россия</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm">Следите за нами</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Users className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <DollarSign className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 EarthKeepers. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
