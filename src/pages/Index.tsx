import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Game {
  id: number;
  title: string;
  price: number;
  players: string;
  age: string;
  duration: string;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Game {
  quantity: number;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Драконье Королевство',
    price: 3499,
    players: '2-4',
    age: '12+',
    duration: '60-90 мин',
    image: 'https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/c1c3a2ef-48bb-4767-ad92-4417982e0862.jpg',
    category: 'Стратегия',
    description: 'Эпическая стратегическая игра в фэнтезийном мире драконов'
  },
  {
    id: 2,
    title: 'Гексагональная Империя',
    price: 4299,
    players: '2-6',
    age: '14+',
    duration: '90-120 мин',
    image: 'https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/6ad1ac46-412e-4e00-8617-b87eab88c8dd.jpg',
    category: 'Стратегия',
    description: 'Сложная стратегия с гексагональным полем и миниатюрами'
  },
  {
    id: 3,
    title: 'Настольный Марафон',
    price: 2799,
    players: '3-8',
    age: '10+',
    duration: '45-60 мин',
    image: 'https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/0b74b40f-8316-45ab-88fe-d1780ff8980c.jpg',
    category: 'Семейная',
    description: 'Веселая семейная игра для большой компании'
  },
  {
    id: 4,
    title: 'Космические Колонии',
    price: 3899,
    players: '2-5',
    age: '12+',
    duration: '60-90 мин',
    image: 'https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/c1c3a2ef-48bb-4767-ad92-4417982e0862.jpg',
    category: 'Стратегия',
    description: 'Покоряйте галактику и стройте космические станции'
  },
  {
    id: 5,
    title: 'Детективное Агентство',
    price: 2999,
    players: '2-6',
    age: '14+',
    duration: '90-120 мин',
    image: 'https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/0b74b40f-8316-45ab-88fe-d1780ff8980c.jpg',
    category: 'Детектив',
    description: 'Расследуйте загадочные преступления и находите улики'
  },
  {
    id: 6,
    title: 'Карточный Дуэль',
    price: 1499,
    players: '2',
    age: '8+',
    duration: '20-30 мин',
    image: 'https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/6ad1ac46-412e-4e00-8617-b87eab88c8dd.jpg',
    category: 'Карточная',
    description: 'Быстрая карточная игра для двоих игроков'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (game: Game) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === game.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
    toast.success(`${game.title} добавлена в корзину`);
  };

  const removeFromCart = (gameId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== gameId));
  };

  const updateQuantity = (gameId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === gameId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Icon name="Gamepad2" size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameBox
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`font-medium transition-colors ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`font-medium transition-colors ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`font-medium transition-colors ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                О магазине
              </button>
              <button
                onClick={() => setActiveSection('delivery')}
                className={`font-medium transition-colors ${activeSection === 'delivery' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Доставка
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`font-medium transition-colors ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Контакты
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {totalItems > 0 ? `Товаров: ${totalItems}` : 'Ваша корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Добавьте игры в корзину</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <>
          <section className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <Badge className="w-fit">🎲 Лучшие настольные игры</Badge>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Откройте мир
                  <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    настольных игр
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Огромный выбор игр для всей семьи. От стратегий до весёлых семейных игр.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="gap-2" onClick={() => setActiveSection('catalog')}>
                    <Icon name="ShoppingBag" size={20} />
                    Перейти в каталог
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('about')}>
                    Узнать больше
                  </Button>
                </div>
              </div>
              <div className="relative animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
                <img
                  src="https://cdn.poehali.dev/projects/f8761b97-9e48-42ae-836e-b40cace7b8ef/files/0b74b40f-8316-45ab-88fe-d1780ff8980c.jpg"
                  alt="Board games"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Популярные игры</h2>
              <p className="text-muted-foreground text-lg">Самые продаваемые игры месяца</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.slice(0, 3).map((game, index) => (
                <Card key={game.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-accent">{game.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{game.title}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        <span>{game.players}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{game.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={16} />
                        <span>{game.age}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{game.price.toLocaleString()} ₽</div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-2" onClick={() => addToCart(game)}>
                      <Icon name="ShoppingCart" size={18} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {activeSection === 'catalog' && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог игр</h2>
            <p className="text-muted-foreground text-lg">Весь ассортимент нашего магазина</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <Card key={game.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent">{game.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      <span>{game.players}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="User" size={16} />
                      <span>{game.age}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{game.price.toLocaleString()} ₽</div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2" onClick={() => addToCart(game)}>
                    <Icon name="ShoppingCart" size={18} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-8">О магазине GameBox</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Store" size={24} className="text-primary" />
                  Наша миссия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  GameBox — это больше чем магазин настольных игр. Мы создаём пространство, где люди могут найти идеальную игру для любого случая.
                </p>
                <p className="text-muted-foreground">
                  С 2020 года мы помогаем тысячам семей и друзей проводить время весело и интересно за настольными играми.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Icon name="Award" size={32} className="text-primary mb-2" />
                  <CardTitle>Качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Только оригинальные игры от проверенных издателей</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="Truck" size={32} className="text-secondary mb-2" />
                  <CardTitle>Доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Быстрая доставка по всей России за 2-5 дней</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Icon name="HeadphonesIcon" size={32} className="text-accent mb-2" />
                  <CardTitle>Поддержка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Консультации по выбору игр 7 дней в неделю</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-8">Доставка и оплата</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} className="text-primary" />
                  Способы доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Курьерская доставка</h4>
                  <p className="text-sm text-muted-foreground">По Москве и МО — 300 ₽, доставка на следующий день</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">Почта России</h4>
                  <p className="text-sm text-muted-foreground">По всей России — от 350 ₽, срок доставки 5-14 дней</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">СДЭК</h4>
                  <p className="text-sm text-muted-foreground">Пункты выдачи по всей России — от 250 ₽, 2-7 дней</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={24} className="text-secondary" />
                  Способы оплаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Мы принимаем оплату банковскими картами, электронными кошельками и наличными при получении.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span>Visa / MasterCard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span>Мир</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span>СБП</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span>Наличные</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-8">Контакты</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
                <CardDescription>Мы всегда рады помочь вам с выбором игры</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground">Ежедневно с 10:00 до 22:00</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">info@gamebox.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Игровая, д. 42</p>
                    <p className="text-sm text-muted-foreground">Пн-Вс: 10:00 - 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="border-t bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameBox
              </span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 GameBox. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
