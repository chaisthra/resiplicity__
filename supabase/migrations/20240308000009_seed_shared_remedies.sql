-- Insert initial shared remedies
INSERT INTO public.shared_remedies (
  title,
  description,
  ingredients,
  instructions,
  prep_time,
  cook_time,
  servings,
  target_age,
  region,
  sub_region,
  dietary_info,
  health_benefits,
  precautions,
  tradition,
  additional_info,
  image_url,
  trust_score,
  votes
) VALUES
(
  'Traditional Masala Chai',
  'A warming Indian spiced tea that aids digestion and boosts immunity',
  ARRAY['2 cups water', '2 cups whole milk', '4 black tea bags or 2 tbsp loose black tea', '4 green cardamom pods', '2 cinnamon sticks', '4 cloves', '1-inch fresh ginger', '1/4 tsp black peppercorns', '2-3 tbsp honey or jaggery'],
  ARRAY['Crush spices lightly to release oils', 'Boil water with spices for 5 minutes', 'Add milk and bring to simmer', 'Add tea and steep for 2-3 minutes', 'Strain into cups', 'Sweeten with honey or jaggery to taste'],
  '5 minutes',
  '15 minutes',
  '4 cups',
  'Teen and Adult',
  'South Asia',
  'India',
  ARRAY['Vegetarian', 'Gluten-Free'],
  ARRAY['Improves digestion', 'Boosts immunity', 'Reduces inflammation', 'Enhances mental alertness', 'Supports respiratory health'],
  ARRAY['Avoid on empty stomach', 'Reduce caffeine if sensitive', 'Consult doctor if pregnant'],
  'Masala chai has been an integral part of Indian culture for centuries. Originally used in Ayurvedic medicine, it became popular during British colonial times when tea cultivation began in India.',
  'Best consumed fresh. Can be made with plant-based milk alternatives. The spice blend can be adjusted to taste.',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=2940',
  50,
  0
),
(
  'Korean Pear and Honey Tea',
  'A traditional Korean remedy for sore throat and cough',
  ARRAY['1 large Korean/Asian pear', '2 tbsp honey', '1 tbsp ginger, julienned', '1 cinnamon stick', '2 cups water', 'Optional: 1 jujube date', 'Optional: 2-3 pine nuts'],
  ARRAY['Peel and core pear, cut into chunks', 'Place pear in pot with water', 'Add ginger and cinnamon', 'Simmer for 15-20 minutes', 'Add honey and optional ingredients', 'Serve warm in tea cups'],
  '10 minutes',
  '20 minutes',
  '2 servings',
  'All Ages',
  'East Asia',
  'Korea',
  ARRAY['Vegan-Optional', 'Gluten-Free', 'Dairy-Free'],
  ARRAY['Soothes sore throat', 'Relieves cough', 'Anti-inflammatory', 'Rich in vitamin C', 'Supports immune system'],
  ARRAY['Check pear allergy', 'Honey not for infants', 'Monitor blood sugar if diabetic'],
  'This remedy, known as "Baesuk" in Korea, has been used for centuries during cold winter months and is particularly popular for treating cold symptoms.',
  'Can be stored in refrigerator for up to 3 days. Reheat gently before serving. The pear can be eaten after drinking the tea.',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=2940',
  50,
  0
),
(
  'Mediterranean Olive Leaf Tea',
  'An antioxidant-rich tea known for its immune-boosting properties',
  ARRAY['2 tbsp dried olive leaves', '2 cups filtered water', '1 slice lemon', '1 tsp honey', 'Optional: 1 sprig fresh rosemary', 'Optional: 1 small piece ginger'],
  ARRAY['Bring water to just below boiling', 'Add olive leaves and optional herbs', 'Steep for 10-15 minutes', 'Strain into cup', 'Add lemon and honey', 'Serve hot or cold'],
  '5 minutes',
  '15 minutes',
  '2 servings',
  'Adult',
  'Mediterranean',
  'Greece',
  ARRAY['Vegan-Optional', 'Gluten-Free', 'Dairy-Free', 'Paleo'],
  ARRAY['Supports immune system', 'Antioxidant rich', 'Helps lower blood pressure', 'Anti-inflammatory', 'Natural energy boost'],
  ARRAY['Start with small amounts', 'May affect blood pressure medication', 'Not recommended during pregnancy'],
  'Olive leaf tea has been used in Mediterranean traditional medicine since ancient Greek times. It was particularly valued for its ability to fight fever and infections.',
  'Use organic olive leaves if possible. Can be combined with other Mediterranean herbs like sage or thyme.',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=2940',
  50,
  0
),
(
  'Mexican Cacao and Cinnamon Elixir',
  'A traditional Mexican chocolate drink with healing properties',
  ARRAY['2 tbsp raw cacao powder', '2 cups plant-based milk', '1 cinnamon stick', '1 vanilla bean or 1 tsp extract', '1 tbsp maple syrup', 'Pinch of cayenne pepper', 'Pinch of sea salt'],
  ARRAY['Heat milk in saucepan', 'Add cinnamon and vanilla', 'Whisk in cacao powder', 'Add maple syrup and spices', 'Simmer for 5-10 minutes', 'Strain and serve hot'],
  '5 minutes',
  '10 minutes',
  '2 servings',
  'Teen and Adult',
  'North America',
  'Mexico',
  ARRAY['Vegan', 'Gluten-Free', 'Dairy-Free'],
  ARRAY['Rich in antioxidants', 'Mood enhancing', 'Heart healthy', 'Improves focus', 'Boosts energy'],
  ARRAY['Contains caffeine', 'Monitor sugar intake', 'May interact with certain medications'],
  'This recipe is inspired by traditional Mexican chocolate drinks that date back to the Aztecs and Mayans, who considered cacao a sacred food with healing properties.',
  'Can be made with any milk alternative. The cayenne pepper adds a subtle heat and increases circulation.',
  'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=2940',
  50,
  0
),
(
  'Russian Immune-Boosting Berry Kompot',
  'A traditional Russian fruit drink packed with vitamins',
  ARRAY['1 cup mixed berries (cranberry, blackberry, raspberry)', '2 apples, sliced', '1 cinnamon stick', '3 cloves', '4 cups water', '2 tbsp honey', 'Optional: 1 lemon slice'],
  ARRAY['Rinse fruits thoroughly', 'Combine fruits and spices in pot', 'Add water and bring to boil', 'Reduce heat and simmer 20 minutes', 'Add honey while warm', 'Serve hot or chilled'],
  '10 minutes',
  '25 minutes',
  '4 servings',
  'All Ages',
  'Eastern Europe',
  'Russia',
  ARRAY['Vegan-Optional', 'Gluten-Free', 'Dairy-Free'],
  ARRAY['High in vitamin C', 'Antioxidant rich', 'Immune boosting', 'Hydrating', 'Natural energy'],
  ARRAY['Check berry allergies', 'Adjust honey for children', 'Monitor sugar intake if diabetic'],
  'Kompot has been a staple of Russian households for centuries. It was traditionally made to preserve summer fruits for winter consumption and provide vital nutrients during cold months.',
  'Can be stored in refrigerator for up to 5 days. The fruits can be eaten after drinking. Frozen berries can be used when fresh aren''t available.',
  'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&q=80&w=2940',
  50,
  0
),
(
  'Moroccan Mint Digestive Tea',
  'A traditional North African tea that aids digestion and refreshes',
  ARRAY['2 tbsp fresh mint leaves', '2 green tea bags', '4 cups water', '2 tbsp honey', '1 slice lemon', 'Optional: 2-3 cardamom pods', 'Optional: 1 small piece ginger'],
  ARRAY['Boil water and let cool slightly', 'Add green tea and steep 2 minutes', 'Add mint leaves and optional spices', 'Steep additional 3-4 minutes', 'Strain and add honey', 'Serve hot or over ice'],
  '5 minutes',
  '10 minutes',
  '4 servings',
  'Teen and Adult',
  'North Africa',
  'Morocco',
  ARRAY['Vegan-Optional', 'Gluten-Free', 'Dairy-Free'],
  ARRAY['Aids digestion', 'Reduces bloating', 'Freshens breath', 'Calming effect', 'Antioxidant rich'],
  ARRAY['Contains caffeine', 'Avoid late in day', 'May affect iron absorption'],
  'Moroccan mint tea is deeply embedded in North African culture and is traditionally served throughout the day. It''s considered both a refreshment and a digestive aid.',
  'The traditional serving involves pouring from a height to create a light foam. Can be served with pine nuts or almonds.',
  'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&q=80&w=2940',
  50,
  0
);