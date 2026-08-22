CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- First account to sign up becomes the owner/admin
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_claim_admin
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.claim_first_admin();

CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  name_am text,
  price integer NOT NULL,
  image_key text,
  image_url text,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Menu is publicly readable" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Admins can insert menu items" ON public.menu_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update menu items" ON public.menu_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete menu items" ON public.menu_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.menu_items (category, name, price, image_key, sort_order) VALUES
('burger','Addiction Burger',913,'burger-2',1),
('burger','Triple Cheese Burger',1304,'burger-3',2),
('burger','Double Cheeseburger',1087,'burger-4',3),
('burger','Cheese Burger',739,'burger-1',4),
('burger','Beef Burger',687,'burger-1',5),
('burger','BBQ Burger',774,'burger-5',6),
('burger','Chicken Burger',783,'burger-7',7),
('burger','Chicken Cheese Burger',826,'burger-6',8),
('burger','Double Chicken Cheese Burger',1174,'burger-8',9),
('pizza','Cannoli Pizza',1087,'pizza-cannoli',1),
('pizza','Meat Lovers Pizza',939,'pizza-meat',2),
('pizza','Margarita Pizza',713,'pizza-margarita',3),
('pizza','Chicken Pizza',983,'pizza-chicken',4),
('pizza','Al Tuna Pizza',913,'pizza-altuna',5),
('pizza','Vegetable Pizza',565,'pizza-vegetable',6),
('pizza','BBQ Chicken Pizza',1026,'pizza-bbq-chicken',7),
('pizza','Tuna Pizza',896,'pizza-tuna',8),
('sandwich','Beef Sandwich',800,'sandwich-beef',1),
('sandwich','Chicken Sandwich',817,'sandwich-chicken',2),
('sandwich','Vegetable Sandwich',487,'sandwich-vegetable',3),
('sandwich','Tuna Sandwich',748,'sandwich-tuna',4),
('sandwich','French Fries',391,'fries',5),
('wrap','Beef Wrap',817,'wrap-beef',1),
('wrap','Chicken Wrap',835,'wrap-chicken',2),
('wrap','Tuna Wrap',765,'wrap-tuna',3),
('wrap','Vegetable Wrap',470,'wrap-vegetable',4),
('soft-drinks','Coca-Cola',80,'drink-cola',1),
('soft-drinks','Sprite',80,'drink-sprite',2),
('soft-drinks','Fanta',80,'drink-fanta',3),
('soft-drinks','Mineral Water',50,'drink-water',4),
('soft-drinks','Fresh Juice (Avocado/Mango/Mixed)',150,'drink-juice',5),
('soft-drinks','Ambo Water',60,'drink-sparkling',6),
('hot-drinks','Macchiato',60,'hot-macchiato',1),
('hot-drinks','Espresso',55,'hot-espresso',2),
('hot-drinks','Cappuccino',70,'hot-cappuccino',3),
('hot-drinks','Ethiopian Coffee (Buna)',45,'hot-buna',4),
('hot-drinks','Hot Tea',40,'hot-tea',5),
('hot-drinks','Hot Chocolate',90,'hot-chocolate',6);