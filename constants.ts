import { Item, ItemType, NPC } from './types';

export const LOCATIONS = [
  { id: 'GreatHall', name: '霍格華茲大廳', type: 'Hogwarts', description: '學生與教授聚集的地方，漂浮著成千上萬支蠟燭，天花板施了魔法反映著外面的天空。' },
  { id: 'GryffindorCommon', name: '葛來分多交誼廳', type: 'Hogwarts', description: '位於胖女士畫像後方，充滿溫暖的火爐與紅色的扶手椅。' },
  { id: 'SlytherinDungeon', name: '史萊哲林地牢', type: 'Hogwarts', description: '位於黑湖底下，透著綠色的幽光，氛圍神秘而高貴。' },
  { id: 'Library', name: '圖書館', type: 'Hogwarts', description: '充滿了古老的書味，平斯夫人嚴厲地監視著每一個學生。' },
  { id: 'PotionsClass', name: '魔藥學教室', type: 'Classroom', description: '位於地下室，陰冷且充滿了奇怪的瓶瓶罐罐。', subject: 'Potions' },
  { id: 'DefenseClass', name: '黑魔法防禦術教室', type: 'Classroom', description: '這裡充滿了各種防禦黑暗生物的圖表與道具。', subject: 'Defense Against the Dark Arts' },
  { id: 'CharmsClass', name: '符咒學教室', type: 'Classroom', description: '充滿歡笑與羽毛漂浮的教室。', subject: 'Charms' },
  { id: 'Herbology', name: '藥草學溫室', type: 'Classroom', description: '充滿了各種奇異且危險的魔法植物。', subject: 'Herbology' },
  { id: 'QuidditchPitch', name: '魁地奇球場', type: 'Hogwarts', description: '四個學院的看台高聳入雲，風在耳邊呼嘯。' },
  { id: 'HogsmeadeVillage', name: '活米村廣場', type: 'Hogsmeade', description: '全英國唯一的純巫師村落，覆蓋著白雪。' },
  
  // Shops
  { id: 'ThreeBroomsticks', name: '三根掃帚', type: 'Hogsmeade', description: '溫暖且熱鬧的酒吧，以奶油啤酒聞名。', isShop: true },
  { id: 'Honeydukes', name: '蜂蜜公爵', type: 'Hogsmeade', description: '傳說中的糖果店，充滿了各種神奇甜點。', isShop: true },
  { id: 'Zonkos', name: '桑科的惡作劇商店', type: 'Hogsmeade', description: '販賣各種惡作劇道具。', isShop: true },
  { id: 'Ollivanders', name: '奧利凡德魔杖店', type: 'Hogsmeade', description: '自西元前382年即開始製作精良魔杖。', isShop: true },
  { id: 'TomesAndScrolls', name: '多梅斯與史苦卷', type: 'Hogsmeade', description: '這裡有你上課所需的所有課本，以及更多古怪的書籍。', isShop: true },
  { id: 'DervishAndBanges', name: '德維與班吉', type: 'Hogsmeade', description: '販賣魔法儀器、設備與各類稀奇古怪的物品。', isShop: true },
  { id: 'PippinsPotions', name: '皮平的魔藥店', type: 'Hogsmeade', description: '提供各種現成的魔藥與稀有藥材。', isShop: true },
];

export const ITEMS: Item[] = [
  // Wands
  { id: 'wand_holly', name: '冬青木魔杖', description: '11英吋，鳳凰尾羽杖芯。哈利波特的魔杖。', price: 70, type: ItemType.Wand },
  { id: 'wand_yew', name: '紫杉木魔杖', description: '13英吋，龍的心弦杖芯。佛地魔的魔杖。', price: 80, type: ItemType.Wand },
  { id: 'wand_elder', name: '接骨木魔杖(複製品)', description: '15英吋，騎士墜鬼馬尾羽。傳說中的魔杖。', price: 150, type: ItemType.Wand },
  { id: 'wand_vine', name: '葡萄藤木魔杖', description: '10¾英吋，龍的心弦。赫敏的魔杖。', price: 65, type: ItemType.Wand },
  { id: 'wand_willow', name: '柳木魔杖', description: '14英吋，獨角獸毛。適合施展治療咒語。榮恩的魔杖。', price: 72, type: ItemType.Wand },
  { id: 'wand_mahogany', name: '桃花心木魔杖', description: '11英吋，柔韌，適合變形術。詹姆波特的魔杖。', price: 68, type: ItemType.Wand },
  { id: 'wand_hawthorn', name: '山楂木魔杖', description: '10英吋，獨角獸毛。', price: 60, type: ItemType.Wand },
  { id: 'wand_ash', name: '白蠟木魔杖', description: '12英吋，獨角獸毛。', price: 65, type: ItemType.Wand },

  // Potions
  { id: 'butterbeer', name: '奶油啤酒', description: '溫暖身心的美味飲料，微醺。', price: 5, type: ItemType.Potion },
  { id: 'pumpkin_juice', name: '南瓜汁', description: '霍格華茲最受歡迎的冷飲。', price: 3, type: ItemType.Potion },
  { id: 'felix_felicis', name: '福來福喜', description: '液態幸運，能讓你在一段時間內事事順心。', price: 200, type: ItemType.Potion },
  { id: 'polyjuice', name: '變身水', description: '能讓你暫時變成另一個人的模樣。', price: 85, type: ItemType.Potion },
  { id: 'amortentia', name: '迷情劑', description: '世界上最強大的愛情魔藥。', price: 50, type: ItemType.Potion },
  { id: 'skele_gro', name: '生骨水', description: '味道很糟，但能讓骨頭重新長出來。', price: 30, type: ItemType.Potion },
  { id: 'draught_peace', name: '平和劑', description: '用來舒緩焦慮和煩躁。', price: 25, type: ItemType.Potion },
  { id: 'pepperup_potion', name: '提神劑', description: '治療感冒，會讓耳朵冒煙。', price: 15, type: ItemType.Potion },
  { id: 'veritaserum', name: '吐真劑', description: '最強大的誠實藥水。', price: 100, type: ItemType.Potion },
  { id: 'wideneye_potion', name: '清醒劑', description: '防止睡著，考試衝刺必備。', price: 20, type: ItemType.Potion },

  // Food / Sweets
  { id: 'chocolate_frog', name: '巧克力蛙', description: '附贈一張著名的巫師卡片。', price: 3, type: ItemType.Food },
  { id: 'bertie_botts', name: '柏蒂全口味豆', description: '小心！真的什麼口味都有！', price: 6, type: ItemType.Food },
  { id: 'fizzing_whizzbees', name: '滋滋蜜蜂糖', description: '吃下去會讓你整個人浮起來。', price: 8, type: ItemType.Food },
  { id: 'cauldron_cakes', name: '大釜蛋糕', description: '霍格華茲特快車上的熱門點心。', price: 4, type: ItemType.Food },
  { id: 'pumpkin_pasty', name: '南瓜餡餅', description: '外酥內軟的傳統巫師點心。', price: 4, type: ItemType.Food },
  { id: 'droobles_gum', name: '吹寶超級泡泡糖', description: '能吹出藍鈴花顏色的泡泡，幾天都不會破。', price: 2, type: ItemType.Food },
  { id: 'acid_pops', name: '酸味爆爆糖', description: '可能會燒穿你的舌頭！', price: 5, type: ItemType.Food },
  { id: 'sugar_quills', name: '糖羽毛筆', description: '可以在課堂上偷偷吸吮的糖果。', price: 3, type: ItemType.Food },
  { id: 'cockroach_clusters', name: '蟑螂串', description: '看起來很噁心，但有些人很愛。', price: 5, type: ItemType.Food },
  { id: 'peppermint_toads', name: '薄荷蟾蜍', description: '吃下去會在胃裡跳動。', price: 4, type: ItemType.Food },

  // Gear
  { id: 'invisibility_cloak_replica', name: '隱形斗篷(複製品)', description: '雖然不能完美隱形，但能模糊身形。', price: 500, type: ItemType.Gear },
  { id: 'omnioculars', name: '全效望遠鏡', description: '具有重播和慢動作功能的望遠鏡。', price: 120, type: ItemType.Gear },
  { id: 'deluminator', name: '熄燈器', description: '可以吸走周圍的光源。', price: 80, type: ItemType.Gear },
  { id: 'spectrespecs', name: '防妖眼鏡', description: '讓你看到平常看不見的騷擾虻。', price: 15, type: ItemType.Gear },
  { id: 'sneakoscope', name: '測奸器', description: '周圍有不可信賴的人時會旋轉發光。', price: 35, type: ItemType.Gear },
  { id: 'nimbus_2000', name: '光輪2000', description: '曾經是最快的飛天掃帚。', price: 300, type: ItemType.Gear },
  { id: 'firebolt', name: '火閃電', description: '世界級的競速掃帚。', price: 1000, type: ItemType.Gear },
  { id: 'wizard_chess', name: '巫師棋', description: '棋子會聽從指令並野蠻地打鬥。', price: 25, type: ItemType.Gear },
  { id: 'gobstones', name: '多多石', description: '輸的時候會對你噴臭水。', price: 10, type: ItemType.Gear },
  { id: 'brass_scales', name: '黃銅天平', description: '魔藥學必備。', price: 12, type: ItemType.Gear },

  // Books
  { id: 'standard_book_spells', name: '標準咒語(初級)', description: '一年級新生的必備課本。', price: 15, type: ItemType.Book },
  { id: 'magical_drafts', name: '魔法藥劑與藥水', description: '阿森尼·吉格著作。', price: 18, type: ItemType.Book },
  { id: 'fantastic_beasts', name: '怪獸與牠們的產地', description: '紐特·斯卡曼德的經典著作。', price: 20, type: ItemType.Book },
  { id: 'quidditch_ages', name: '魁地奇溯源', description: '肯尼沃思·惠斯普著作。', price: 14, type: ItemType.Book },
  { id: 'monster_book', name: '怪獸的怪獸書', description: '小心，它會咬人！請輕撫書脊。', price: 40, type: ItemType.Book },
  { id: 'hogwarts_history', name: '霍格華茲，一段歷史', description: '妙麗·格蘭傑的最愛。', price: 30, type: ItemType.Book },
  { id: 'advanced_potion', name: '高階魔藥製作', description: '六年級魔藥學課本。', price: 35, type: ItemType.Book },
  { id: 'dark_arts_guide', name: '黑魔法防禦術指南', description: '實用的防禦技巧。', price: 22, type: ItemType.Book },
  { id: 'unfogging_future', name: '撥開未來的迷霧', description: '占卜學課本。', price: 18, type: ItemType.Book },
  { id: 'transfiguration_guide', name: '變形術指南', description: '初學者必讀。', price: 16, type: ItemType.Book },

  // Misc / Pranks
  { id: 'dungbomb', name: '糞蛋', description: '發出難聞氣味的惡作劇道具。', price: 10, type: ItemType.Misc },
  { id: 'quill', name: '速記羽毛筆', description: '能夠自動記錄你所說的話。', price: 25, type: ItemType.Misc },
  { id: 'remembrall', name: '記憶球', description: '如果你忘記了什麼，它會變紅。', price: 15, type: ItemType.Misc },
  { id: 'howler', name: '吼叫信', description: '將你的憤怒大聲傳達給收件人。', price: 12, type: ItemType.Misc },
  { id: 'marauders_map_replica', name: '劫盜地圖(複製品)', description: '惡作劇完畢！', price: 60, type: ItemType.Misc },
  { id: 'extendable_ears', name: '伸縮耳', description: '衛斯理雙胞胎發明，用來竊聽對話。', price: 18, type: ItemType.Misc },
  { id: 'peruvian_powder', name: '祕魯瞬間黑暗粉', description: '製造無法被魔法穿透的黑暗。', price: 22, type: ItemType.Misc },
  { id: 'fanged_frisbee', name: '尖牙飛盤', description: '被禁止的危險玩具。', price: 15, type: ItemType.Misc },
  { id: 'screaming_yo_yo', name: '尖叫溜溜球', description: '玩的時候會發出尖叫聲。', price: 10, type: ItemType.Misc },
  { id: 'nose_biting_teacup', name: '咬鼻子茶杯', description: '惡作劇的好幫手。', price: 20, type: ItemType.Misc },
];

export const NPCS: NPC[] = [
  // Staff & Professors
  { id: 'dumbledore', name: 'Albus Dumbledore', role: 'Headmaster', locationId: 'GreatHall', image: 'https://ladygeekgirl.wordpress.com/wp-content/uploads/2014/01/albus-dumbledore.jpg?w=640', personality: 'Wise, calm, enigmatic, kindly, uses riddles.' },
  { id: 'mcgonagall', name: 'Minerva McGonagall', role: 'Head of Gryffindor', locationId: 'GreatHall', image: 'https://pyxis.nymag.com/v1/imgs/856/ad7/637868dd7c23862ac68381ec2373470e3f-06-minerva-mcgonagall.rsocial.w1200.jpg', personality: 'Strict, fair, scottish accent, protective.' },
  { id: 'snape', name: 'Severus Snape', role: 'Potions Master', locationId: 'GreatHall', image: 'https://www.looper.com/img/gallery/severus-snapes-entire-backstory-explained/intro-1595622776.jpg', personality: 'Cold, sarcastic, biased towards Slytherin, deep voice.' },
  { id: 'flitwick', name: 'Filius Flitwick', role: 'Charms Professor', locationId: 'GreatHall', image: 'https://i.namu.wiki/i/MiTFm3v2k7fve6rlQ8_bSP4_uFx8ot9pBgXzaKjaDC8q20rbNA0CAw6xagX6Jwid3VFtzz-afEx3ZFfRGXN_pQ.webp', personality: 'Excitable, squeaky voice, encouraging.' },
  { id: 'sprout', name: 'Pomona Sprout', role: 'Herbology Professor', locationId: 'GreatHall', image: 'https://nypost.com/wp-content/uploads/sites/2/2025/05/miriam-margolyes-professor-sprout-harry-105409349.jpg?quality=75&strip=all&w=1024', personality: 'Motherly, messy, loves plants, cheerful.' },
  { id: 'hagrid', name: 'Rubeus Hagrid', role: 'Gamekeeper', locationId: 'HogsmeadeVillage', image: 'https://static.wikia.nocookie.net/characters/images/3/3d/Rubeus_Hagrid_Movie.jpg/revision/latest?cb=20240824183730', personality: 'Gentle giant, loyal to Dumbledore, loves dangerous creatures.' },
  { id: 'trelawney', name: 'Sybill Trelawney', role: 'Divination Professor', locationId: 'Library', image: 'https://contentful.harrypotter.com/usf1vwtuqyxm/1296BxymyCQA4Ioiu6Cwm6/902bf92e31fa7365b64d8ff6966c7618/SybilTrelawney_WB_F3_HeadshotOfTrelawney_Still_080615_Land.jpg?q=75&fm=jpg&w=2560', personality: 'Dramatic, misty voice, constantly predicting death.' },
  { id: 'filch', name: 'Argus Filch', role: 'Caretaker', locationId: 'GreatHall', image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2016/12/argus-filch-in-harry-potter.jpg?w=1200&h=675&fit=crop', personality: 'Grumpy, hates students, obsessed with rules.' },
  { id: 'madame_pomfrey', name: 'Poppy Pomfrey', role: 'Matron', locationId: 'GreatHall', image: 'https://getpersonality.com/_next/image?url=https%3A%2F%2Fstatic1.personality-database.com%2Fprofile_images%2F15e1e5d700974494a49954146df2570d.png&w=3840&q=75', personality: 'Strict about health, no-nonsense, caring.' },
  { id: 'pince', name: 'Irma Pince', role: 'Librarian', locationId: 'Library', image: 'https://static.wikia.nocookie.net/harrypotter/images/5/53/PinceProfile.png/revision/latest?cb=20111128202842', personality: 'Extremely strict, hates noise, protective of books.' },

  // Gryffindor Students
  { id: 'harry', name: 'Harry Potter', role: 'Student', locationId: 'GryffindorCommon', image: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg', personality: 'Brave, humble, loyal, sometimes impulsive.' },
  { id: 'ron', name: 'Ron Weasley', role: 'Student', locationId: 'GryffindorCommon', image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg', personality: 'Loyal, funny, insecure about money, terrified of spiders.' },
  { id: 'hermione', name: 'Hermione Granger', role: 'Student', locationId: 'Library', image: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg', personality: 'Brilliant, bossy, logical, stickler for rules.' },
  { id: 'neville', name: 'Neville Longbottom', role: 'Student', locationId: 'Library', image: 'https://www.looper.com/img/gallery/the-untold-truth-of-neville-longbottom-from-harry-potter/l-intro-1661519980.jpg', personality: 'Forgetful, clumsy, brave underneath, loves plants.' },
  { id: 'ginny', name: 'Ginny Weasley', role: 'Student', locationId: 'GryffindorCommon', image: 'http://images4.fanpop.com/image/photos/19300000/Ginny-COS-Official-Photoshoot-ginevra-ginny-weasley-19358665-1046-1299.jpg', personality: 'Feisty, confident, good at hexes.' },
  { id: 'fred', name: 'Fred Weasley', role: 'Student', locationId: 'HogsmeadeVillage', image: 'https://vignette.wikia.nocookie.net/pottermore/images/8/8e/Fred-weasley-frederick-weasley-james-phelps-Favim.com-590803.png/revision/latest?cb=20161210145703', personality: 'Jokester, mischievous, completes George\'s sentences.' },
  { id: 'george', name: 'George Weasley', role: 'Student', locationId: 'HogsmeadeVillage', image: 'https://media.harrypotterfanzone.com/george-weasley-order-of-the-phoenix-portrait-3.jpg', personality: 'Jokester, mischievous, completes Fred\'s sentences.' },
  
  // Slytherin Students
  { id: 'draco', name: 'Draco Malfoy', role: 'Student', locationId: 'SlytherinDungeon', image: 'http://images2.fanpop.com/image/photos/14600000/Draco-Malfoy-draco-malfoy-14656017-1024-768.jpg', personality: 'Arrogant, wealthy, bully, secretly insecure.' },
  { id: 'pansy', name: 'Pansy Parkinson', role: 'Student', locationId: 'SlytherinDungeon', image: 'https://i.pinimg.com/736x/a3/cf/81/a3cf81e4be3cd590b8df7da3ea3059f8.jpg', personality: 'Mean, fawns over Draco, gossipy.' },
  { id: 'crabbe', name: 'Vincent Crabbe', role: 'Student', locationId: 'SlytherinDungeon', image: 'https://media.harrypotterfanzone.com/vincent-crabbe-goblet-of-fire-portrait.jpg', personality: 'Dim-witted, follows Draco, loves food.' },
  
  // Ravenclaw Students
  { id: 'luna', name: 'Luna Lovegood', role: 'Student', locationId: 'QuidditchPitch', image: 'https://www.looper.com/img/gallery/luna-lovegoods-fascinating-history-from-harry-potter/intro-1666381929.jpg', personality: 'Dreamy, believes in strange creatures, brutally honest.' },
  { id: 'cho', name: 'Cho Chang', role: 'Student', locationId: 'QuidditchPitch', image: 'https://static.wikia.nocookie.net/harrypotter/images/1/1e/Cho_Chang.jpg', personality: 'Popular, emotional, good Seeker.' },
  { id: 'padma', name: 'Padma Patil', role: 'Student', locationId: 'Library', image: 'https://vignette.wikia.nocookie.net/harrypotter/images/0/0d/Padma_Patil_HD.jpg/revision/latest?cb=20141204162130&path-prefix=ru', personality: 'Serious, intelligent, Parvati\'s twin.' },

  // Hufflepuff Students
  { id: 'cedric', name: 'Cedric Diggory', role: 'Student', locationId: 'QuidditchPitch', image: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/11/Robert-Pattinson-as-Cedric-Diggory-In-Harry-Potter-Goblet-Of-Fire.jpg', personality: 'Fair, modest, popular, hardworking.' },
  { id: 'hannah', name: 'Hannah Abbott', role: 'Student', locationId: 'Library', image: 'https://giratempoweb.net/wp-content/uploads/2022/10/hannah-abbott.jpg', personality: 'Anxious, kind, easily flustered.' },

  // Ghosts
  { id: 'nick', name: 'Nearly Headless Nick', role: 'Ghost', locationId: 'GryffindorCommon', image: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/04/Harry-Potter-Nearly-Headless-Nick-John-Cleese.jpg', personality: 'Polite, sensitive about his neck, proud.' },
  { id: 'myrtle', name: 'Moaning Myrtle', role: 'Ghost', locationId: 'SlytherinDungeon', image: 'https://www.dexerto.com/cdn-image/wp-content/uploads/2025/11/26/Moaning-Myrtle-harry-potter-1.jpg?width=1200&quality=60&format=auto', personality: 'Miserable, sensitive, wails loudly, stalks bathrooms.' },
  { id: 'bloody_baron', name: 'The Bloody Baron', role: 'Ghost', locationId: 'SlytherinDungeon', image: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/09/Harry-Potter-Bloody-Baron.jpg', personality: 'Silent, terrifying, commands respect.' },
  { id: 'grey_lady', name: 'The Grey Lady', role: 'Ghost', locationId: 'Library', image: 'https://i.pinimg.com/originals/e1/a9/09/e1a90915efcaa6b40a306e56adea20a8.jpg', personality: 'Haughty, distant, secretive.' },
  { id: 'fat_friar', name: 'The Fat Friar', role: 'Ghost', locationId: 'GreatHall', image: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/fat-friar.jpg', personality: 'Jolly, forgiving, loves food (ghostly).' },

  // Hogsmeade / Others
  { id: 'rosmerta', name: 'Madam Rosmerta', role: 'Landlady', locationId: 'ThreeBroomsticks', image: 'https://figurineharrypotter.com/img-perso/madam-rosmerta.jpg', personality: 'Friendly, gossipy, welcoming.' },
  { id: 'aberforth', name: 'Aberforth Dumbledore', role: 'Barman', locationId: 'HogsmeadeVillage', image: 'https://i.pinimg.com/736x/05/dc/d1/05dcd17290aea80e650f83f153a2de86.jpg', personality: 'Grumpy, cynical, keeps goats, dislikes Albus.' },
  { id: 'ollivander', name: 'Garrick Ollivander', role: 'Wandmaker', locationId: 'Ollivanders', image: 'https://www.encyclopedie-hp.org/wp-content/uploads/sites/4/2016/09/ollivander-2.jpg', personality: 'Creepy but brilliant, obsessed with wandlore.' },
];

// Define inventory by matching Item IDs to Shop Location IDs
export const SHOP_INVENTORY: Record<string, string[]> = {
  'ThreeBroomsticks': ['butterbeer', 'pumpkin_juice'],
  
  'Honeydukes': [
    'chocolate_frog', 'bertie_botts', 'fizzing_whizzbees', 'cauldron_cakes', 
    'pumpkin_pasty', 'droobles_gum', 'acid_pops', 'sugar_quills', 
    'cockroach_clusters', 'peppermint_toads'
  ],
  
  'Zonkos': [
    'dungbomb', 'howler', 'extendable_ears', 'peruvian_powder', 
    'fanged_frisbee', 'screaming_yo_yo', 'nose_biting_teacup', 'marauders_map_replica'
  ],
  
  'Ollivanders': [
    'wand_holly', 'wand_yew', 'wand_elder', 'wand_vine', 
    'wand_willow', 'wand_mahogany', 'wand_hawthorn', 'wand_ash'
  ],
  
  'TomesAndScrolls': [
    'standard_book_spells', 'magical_drafts', 'fantastic_beasts', 'quidditch_ages', 
    'monster_book', 'hogwarts_history', 'advanced_potion', 'dark_arts_guide', 
    'unfogging_future', 'transfiguration_guide'
  ],
  
  'DervishAndBanges': [
    'invisibility_cloak_replica', 'omnioculars', 'deluminator', 'spectrespecs', 
    'sneakoscope', 'nimbus_2000', 'firebolt', 'wizard_chess', 
    'gobstones', 'brass_scales', 'quill', 'remembrall'
  ],

  'PippinsPotions': [
    'felix_felicis', 'polyjuice', 'amortentia', 'skele_gro', 
    'draught_peace', 'pepperup_potion', 'veritaserum', 'wideneye_potion'
  ]
};