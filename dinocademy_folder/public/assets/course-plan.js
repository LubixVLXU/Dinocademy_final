// course-plan.js
// Kompleksowy plan kursu paleontologii (Dinocademy)
// Wygenerowano na podstawie planu kursu w języku polskim
// Wszystkie etapy, moduły, lekcje, praktyki i lekcje kluczowe
//
// Struktura: 8 etapów (ETAP 0–VII), 33 moduły, certyfikacja z 4 poziomami osiągnięć

window.COURSE_PLAN = {
  stages: [
    {
      id: "etap-0",
      title: "Jak działa paleontologia",
      hours: "10 godzin",
      modules: [
          {
            id: "m1",
            title: "Paleontologia jako nauka",
            lessons: [
                {
                  id: "m1-l1",
                  title: "Czym jest paleontologia?",
                  desc: "Wprowadzenie do paleontologii jako nauki badającej życie dawnej Ziemi na podstawie skamieniałości i ich kontekstu geologicznego.",
                  duration: 9
                },
                {
                  id: "m1-l2",
                  title: "Paleontologia vs archeologia vs geologia vs biologia",
                  desc: "Rozróżnienie paleontologii od pokrewnych dyscyplin — czym się zajmuje, a czym nie.",
                  duration: 10
                },
                {
                  id: "m1-l3",
                  title: "Czym jest skamieniałość?",
                  desc: "Definicja skamieniałości i warunki, które muszą być spełnione, aby organizm lub jego ślad został zachowany w zapisie kopalnym.",
                  duration: 11
                },
                {
                  id: "m1-l4",
                  title: "Co może być skamieniałością?",
                  desc: "Przegląd rodzajów materiału, który może ulec fosylizacji — od kości i muszli po pyłek i ślady aktywności.",
                  duration: 12
                },
                {
                  id: "m1-l5",
                  title: "Body fossils i trace fossils",
                  desc: "Podział na skamieniałości ciała (body fossils) oraz skamieniałości śladowe (trace fossils) i ich różna wartość informacyjna.",
                  duration: 13
                },
                {
                  id: "m1-l6",
                  title: "Makroskamieniałości i mikroskamieniałości",
                  desc: "Podział skamieniałości ze względu na wielkość oraz różnice w metodach ich pozyskiwania i analizy.",
                  duration: 14
                },
                {
                  id: "m1-l7",
                  title: "Paleontologia kręgowców",
                  desc: "Zarys paleontologii kręgowców — od ryb po ssaki i dinozaury — jako jednej z głównych dziedzin.",
                  duration: 15
                },
                {
                  id: "m1-l8",
                  title: "Paleontologia bezkręgowców",
                  desc: "Przegląd paleontologii bezkręgowców, jej znaczenia dla biostratygrafii i rekonstrukcji środowisk.",
                  duration: 8
                },
                {
                  id: "m1-l9",
                  title: "Mikropaleontologia",
                  desc: "Wprowadzenie do mikropaleontologii — mikroskamieniałości jako potężne narzędzie biostratygraficzne i paleoekologiczne.",
                  duration: 9
                },
                {
                  id: "m1-l10",
                  title: "Paleobotanika i palinologia",
                  desc: "Zarys paleobotaniki oraz palinologii — badania kopalnych roślin i pyłku.",
                  duration: 10
                },
                {
                  id: "m1-l11",
                  title: "Ichnologia",
                  desc: "Wprowadzenie do ichnologii — nauki o śladach działalności organizmów kopalnych.",
                  duration: 11
                },
                {
                  id: "m1-l12",
                  title: "Paleoekologia",
                  desc: "Zarys paleoekologii — rekonstrukcja dawnych ekosystemów i relacji między organizmami na podstawie zapisu kopalnego.",
                  duration: 12
                },
                {
                  id: "m1-l13",
                  title: "Paleobiologia",
                  desc: "Wprowadzenie do paleobiologii — biologicznego podejścia do skamieniałości i procesów ewolucyjnych w czasie geologicznym.",
                  duration: 13
                },
                {
                  id: "m1-l14",
                  title: "Biostratygrafia",
                  desc: "Podstawy biostratygrafii — wykorzystanie skamieniałości do datowania i korelacji warstw skalnych.",
                  duration: 14
                },
                {
                  id: "m1-l15",
                  title: "Jak wygląda prawdziwy projekt paleontologiczny",
                  desc: "Przegląd pełnego cyklu projektu badawczego — od pytania badawczego po publikację i depozyt w muzeum.",
                  duration: 15
                }
            ]
,
            keyLesson: {
              title: "Obserwacja czy interpretacja?",
              desc: "Uczeń dostaje zdjęcie kości wystającej ze skały. Zamiast pytać „Jaki to dinozaur?\", uczeń musi rozdzielić obserwację („w skale znajduje się zmineralizowana struktura o określonej morfologii\") od interpretacji („może być fragmentem kości kręgowca\") od hipotezy („może należeć do konkretnego taksonu\"). To jeden z najważniejszych nawyków całego kursu."
            }
          }
      ]
    },
    {
      id: "etap-1",
      title: "Fundamenty naukowe",
      hours: "około 50 godzin",
      modules: [
          {
            id: "m2",
            title: "Ziemia jako planeta",
            lessons: [
                {
                  id: "m2-l1",
                  title: "Powstanie Układu Słonecznego",
                  desc: "Geneza Układu Słonecznego z mgławicy protosłonecznej i formowanie się planet.",
                  duration: 9
                },
                {
                  id: "m2-l2",
                  title: "Powstanie Ziemi",
                  desc: "Akrecja Ziemi, formowanie się jej warstw i wczesna ewolucja planety.",
                  duration: 10
                },
                {
                  id: "m2-l3",
                  title: "Budowa Ziemi",
                  desc: "Podstawowa budowa wnętrza Ziemi — skorupa, płaszcz i jądro — i ich właściwości.",
                  duration: 11
                },
                {
                  id: "m2-l4",
                  title: "Skorupa",
                  desc: "Budowa i rodzaje skorupy ziemskiej — kontynentalna i oceaniczna.",
                  duration: 12
                },
                {
                  id: "m2-l5",
                  title: "Płaszcz",
                  desc: "Struktura i rola płaszcza Ziemi w procesach geologicznych.",
                  duration: 13
                },
                {
                  id: "m2-l6",
                  title: "Jądro",
                  desc: "Budowa jądra Ziemi, jego skład i znaczenie dla pola magnetycznego.",
                  duration: 14
                },
                {
                  id: "m2-l7",
                  title: "Litosfera",
                  desc: "Pojęcie litosfery i jej rola w tektonice płyt.",
                  duration: 15
                },
                {
                  id: "m2-l8",
                  title: "Płyty tektoniczne",
                  desc: "Podział litosfery na płyty tektoniczne i ich ruchy.",
                  duration: 8
                },
                {
                  id: "m2-l9",
                  title: "Dryf kontynentów",
                  desc: "Historia i mechanizm dryfu kontynentów — od Wegenera do współczesnej tektoniki płyt.",
                  duration: 9
                },
                {
                  id: "m2-l10",
                  title: "Subdukcja",
                  desc: "Proces subdukcji — zagłębianie się płyty oceanicznej pod płytę kontynentalną.",
                  duration: 10
                },
                {
                  id: "m2-l11",
                  title: "Ryfty",
                  desc: "Strefy ryftowe — rozsuwanie się płyt i powstawanie nowej skorupy oceanicznej.",
                  duration: 11
                },
                {
                  id: "m2-l12",
                  title: "Kolizje kontynentów",
                  desc: "Zderzenia płyt kontynentalnych i ich efekty orogeniczne.",
                  duration: 12
                },
                {
                  id: "m2-l13",
                  title: "Powstawanie gór",
                  desc: "Mechanizmy orogenezy — jak powstają łańcuchy górskie.",
                  duration: 13
                },
                {
                  id: "m2-l14",
                  title: "Wulkanizm",
                  desc: "Rodzaje wulkanizmu i ich związek z tektoniką płyt.",
                  duration: 14
                },
                {
                  id: "m2-l15",
                  title: "Trzęsienia ziemi",
                  desc: "Przyczyny i mechanizmy trzęsień ziemi oraz ich związek z ruchem płyt.",
                  duration: 15
                },
                {
                  id: "m2-l16",
                  title: "Cykl Wilsona",
                  desc: "Cykl otwierania i zamykania oceanów — od ryftu przez subdukcję po kolizję kontynentów.",
                  duration: 8
                },
                {
                  id: "m2-l17",
                  title: "Dlaczego kontynenty zmieniają położenie",
                  desc: "Podsumowanie sił napędzających ruch płyt tektonicznych i zmiany położenia kontynentów.",
                  duration: 9
                }
            ]
,
            practice: {
              title: "Rekonstrukcja położenia kontynentów",
              desc: "Uczeń rekonstruuje położenie kontynentów dla różnych momentów czasu geologicznego, korzystając z paleomapy."
            }
          },
          {
            id: "m3",
            title: "Minerały, skały i cykl skalny",
            lessons: [
                {
                  id: "m3-l1",
                  title: "Co jest minerałem",
                  desc: "Definicja minerału — naturalny, krystaliczny związek chemiczny o stałym składzie.",
                  duration: 9
                },
                {
                  id: "m3-l2",
                  title: "Co jest skałą",
                  desc: "Definicja skały jako agregatu minerałów i klasyfikacja na trzy główne grupy.",
                  duration: 10
                },
                {
                  id: "m3-l3",
                  title: "Skały magmowe",
                  desc: "Powstawanie i rodzaje skał magmowych — intruzji i wylewnych.",
                  duration: 11
                },
                {
                  id: "m3-l4",
                  title: "Skały metamorficzne",
                  desc: "Przekształcenia skał pod wpływem ciśnienia i temperatury.",
                  duration: 12
                },
                {
                  id: "m3-l5",
                  title: "Skały osadowe",
                  desc: "Powstawanie skał osadowych — środowisko, w którym najczęściej zachowują się skamieniałości.",
                  duration: 13
                },
                {
                  id: "m3-l6",
                  title: "Piaskowiec",
                  desc: "Cechy piaskowca i jego znaczenie dla zachowania skamieniałości.",
                  duration: 14
                },
                {
                  id: "m3-l7",
                  title: "Mułowiec",
                  desc: "Budowa mułowca i warunki jego powstawania.",
                  duration: 15
                },
                {
                  id: "m3-l8",
                  title: "Iłowiec",
                  desc: "Iłowiec jako skała sprzyjająca doskonałej konserwacji delikatnych skamieniałości.",
                  duration: 8
                },
                {
                  id: "m3-l9",
                  title: "Wapień",
                  desc: "Wapienie i ich rola w środowiskach węglanowych oraz fosylizacji.",
                  duration: 9
                },
                {
                  id: "m3-l10",
                  title: "Zlepieniec",
                  desc: "Cechy zlepieńca i ich znaczenie sedymentologiczne.",
                  duration: 10
                },
                {
                  id: "m3-l11",
                  title: "Ewaporaty",
                  desc: "Skały ewaporatowe i warunki ich krystalizacji z roztworów.",
                  duration: 11
                },
                {
                  id: "m3-l12",
                  title: "Wietrzenie",
                  desc: "Procesy wietrzenia fizycznego i chemicznego niszczące skały.",
                  duration: 12
                },
                {
                  id: "m3-l13",
                  title: "Erozja",
                  desc: "Mechanizmy erozji i usuwania materiału skalnego.",
                  duration: 13
                },
                {
                  id: "m3-l14",
                  title: "Transport",
                  desc: "Sposoby transportu materiału osadowego i ich wpływ na sortowanie.",
                  duration: 14
                },
                {
                  id: "m3-l15",
                  title: "Depozycja",
                  desc: "Proces osadzania materiału i warunki depozycji.",
                  duration: 15
                },
                {
                  id: "m3-l16",
                  title: "Diageneza",
                  desc: "Przekształcenia osadu w zwięzłą skałę po depozycji.",
                  duration: 8
                },
                {
                  id: "m3-l17",
                  title: "Cementacja",
                  desc: "Cementacja — spajanie ziarn osadu minerałami wtórnymi.",
                  duration: 9
                },
                {
                  id: "m3-l18",
                  title: "Kompakcja",
                  desc: "Zmniejszanie objętości osadu pod wpływem nacisku nadkładu.",
                  duration: 10
                },
                {
                  id: "m3-l19",
                  title: "Porowatość",
                  desc: "Pojęcie porowatości skały i jej znaczenie dla zachowania skamieniałości.",
                  duration: 11
                },
                {
                  id: "m3-l20",
                  title: "Cykl skalny",
                  desc: "Obieg materii między trzema głównymi typami skał w cyklu skalnym.",
                  duration: 12
                }
            ]
,
            practice: {
              title: "Egzamin praktyczny — rozpoznawanie skał",
              desc: "Pokazujesz 20 fotografii skał. Uczeń określa, czy skała jest osadowa, magmowa czy metamorficzna, oraz wyjaśnia, czy i dlaczego jest prawdopodobne znalezienie w niej skamieniałości."
            }
          },
          {
            id: "m4",
            title: "Biologia dla paleontologa",
            lessons: [
                {
                  id: "m4-l1",
                  title: "Komórka",
                  desc: "Budowa i funkcje komórki — podstawowej jednostki życia.",
                  duration: 9
                },
                {
                  id: "m4-l2",
                  title: "DNA",
                  desc: "Struktura i rola DNA jako nośnika informacji genetycznej.",
                  duration: 10
                },
                {
                  id: "m4-l3",
                  title: "Gen",
                  desc: "Pojęcie genu i mechanizm ekspresji genetycznej.",
                  duration: 11
                },
                {
                  id: "m4-l4",
                  title: "Mutacja",
                  desc: "Rodzaje mutacji i ich rola jako źródła zmienności ewolucyjnej.",
                  duration: 12
                },
                {
                  id: "m4-l5",
                  title: "Dziedziczenie",
                  desc: "Zasady dziedziczenia cech i prawa Mendla.",
                  duration: 13
                },
                {
                  id: "m4-l6",
                  title: "Fenotyp",
                  desc: "Różnica między genotypem a fenotypem i wpływ środowiska na cechy.",
                  duration: 14
                },
                {
                  id: "m4-l7",
                  title: "Populacja",
                  desc: "Pojęcie populacji jako jednostki ewoluującej.",
                  duration: 15
                },
                {
                  id: "m4-l8",
                  title: "Gatunek",
                  desc: "Biologiczna i morfologiczna koncepcja gatunku.",
                  duration: 8
                },
                {
                  id: "m4-l9",
                  title: "Dobór naturalny",
                  desc: "Mechanizm doboru naturalnego — fundament ewolucji darwinowskiej.",
                  duration: 9
                },
                {
                  id: "m4-l10",
                  title: "Dryf genetyczny",
                  desc: "Losowe zmiany częstotliwości alleli w małych populacjach.",
                  duration: 10
                },
                {
                  id: "m4-l11",
                  title: "Przepływ genów",
                  desc: "Wymiana genów między populacjami i jej efekty.",
                  duration: 11
                },
                {
                  id: "m4-l12",
                  title: "Specjacja",
                  desc: "Mechanizmy powstawania nowych gatunków.",
                  duration: 12
                },
                {
                  id: "m4-l13",
                  title: "Wymieranie",
                  desc: "Proces wymierania gatunków i jego przyczyny.",
                  duration: 13
                },
                {
                  id: "m4-l14",
                  title: "Adaptacja",
                  desc: "Pojęcie adaptacji i dostosowania organizmu do środowiska.",
                  duration: 14
                },
                {
                  id: "m4-l15",
                  title: "Konwergencja",
                  desc: "Ewolucja konwergentna — niezależne powstawanie podobnych cech u niespokrewnionych organizmów.",
                  duration: 15
                },
                {
                  id: "m4-l16",
                  title: "Homologia",
                  desc: "Homologia — cechy wspólnego pochodzenia u spokrewnionych organizmów.",
                  duration: 8
                },
                {
                  id: "m4-l17",
                  title: "Analogia",
                  desc: "Analogia — cechy o podobnej funkcji, ale różnym pochodzeniu.",
                  duration: 9
                },
                {
                  id: "m4-l18",
                  title: "Ekologia organizmu",
                  desc: "Relacje organizmu ze środowiskiem i innymi organizmami.",
                  duration: 10
                },
                {
                  id: "m4-l19",
                  title: "Nisza ekologiczna",
                  desc: "Pojęcie niszy ekologicznej i roli gatunku w ekosystemie.",
                  duration: 11
                },
                {
                  id: "m4-l20",
                  title: "Łańcuchy pokarmowe",
                  desc: "Struktura łańcuchów pokarmowych i przepływ energii.",
                  duration: 12
                },
                {
                  id: "m4-l21",
                  title: "Sieci troficzne",
                  desc: "Złożone sieci troficzne i relacje między organizmami w ekosystemie.",
                  duration: 13
                },
                {
                  id: "m4-l22",
                  title: "Produkcja pierwotna",
                  desc: "Produkcja pierwotna — podstawa łańcuchów pokarmowych w ekosystemach.",
                  duration: 14
                },
                {
                  id: "m4-l23",
                  title: "Drapieżnictwo",
                  desc: "Relacje drapieżnik—ofiara i ich rola ewolucyjna.",
                  duration: 15
                },
                {
                  id: "m4-l24",
                  title: "Konkurencja",
                  desc: "Konkurencja międzygatunkowa i wewnątrzgatunkowa o zasoby.",
                  duration: 8
                },
                {
                  id: "m4-l25",
                  title: "Mutualizm",
                  desc: "Współzależne relacje mutualistyczne między organizmami.",
                  duration: 9
                }
            ]
          },
          {
            id: "m5",
            title: "Ewolucja",
            lessons: [
                {
                  id: "m5-l1",
                  title: "Darwin i Wallace",
                  desc: "Historyczne podstawy teorii ewolucji — wkład Darwina i Wallace'a.",
                  duration: 9
                },
                {
                  id: "m5-l2",
                  title: "Dobór naturalny",
                  desc: "Mechanizm doboru naturalnego jako siły napędowej ewolucji.",
                  duration: 10
                },
                {
                  id: "m5-l3",
                  title: "Fitness biologiczny",
                  desc: "Pojęcie dostosowania (fitness) i jego pomiar w ewolucji.",
                  duration: 11
                },
                {
                  id: "m5-l4",
                  title: "Adaptacja",
                  desc: "Proces adaptacji i powstawania cech zwiększających dostosowanie.",
                  duration: 12
                },
                {
                  id: "m5-l5",
                  title: "Zmienność",
                  desc: "Źródła i znaczenie zmienności wewnątrzgatunkowej.",
                  duration: 13
                },
                {
                  id: "m5-l6",
                  title: "Specjacja allopatryczna",
                  desc: "Powstawanie gatunków na drodze izolacji geograficznej.",
                  duration: 14
                },
                {
                  id: "m5-l7",
                  title: "Specjacja sympatryczna",
                  desc: "Powstawanie gatunków bez izolacji geograficznej.",
                  duration: 15
                },
                {
                  id: "m5-l8",
                  title: "Radiacje adaptacyjne",
                  desc: "Szybkie różnicowanie się gatunków w nowe nisze ekologiczne.",
                  duration: 8
                },
                {
                  id: "m5-l9",
                  title: "Konwergencja",
                  desc: "Ewolucja konwergentna i powstawanie analogii.",
                  duration: 9
                },
                {
                  id: "m5-l10",
                  title: "Paralelizm",
                  desc: "Ewolucja równoległa u spokrewnionych linii.",
                  duration: 10
                },
                {
                  id: "m5-l11",
                  title: "Homologia",
                  desc: "Homologia jako cecha wspólnego pochodzenia w systematyce.",
                  duration: 11
                },
                {
                  id: "m5-l12",
                  title: "Ewolucja mozaikowa",
                  desc: "Nierównomierne tempo ewolucji różnych cech u organizmu.",
                  duration: 12
                },
                {
                  id: "m5-l13",
                  title: "Tempo ewolucji",
                  desc: "Różne modele tempa ewolucji — gradualizm i równowaga przerywana.",
                  duration: 13
                },
                {
                  id: "m5-l14",
                  title: "Wymieranie tła",
                  desc: "Tło wymierania — stały proces zanikania gatunków.",
                  duration: 14
                },
                {
                  id: "m5-l15",
                  title: "Masowe wymierania",
                  desc: "Wielkie wymierania w historii Ziemi i ich przyczyny.",
                  duration: 15
                },
                {
                  id: "m5-l16",
                  title: "Ewolucja a „postęp\"",
                  desc: "Dlaczego ewolucja nie jest równoznaczna z postępem w sensie kierunkowym.",
                  duration: 8
                },
                {
                  id: "m5-l17",
                  title: "Dlaczego ewolucja nie ma celu",
                  desc: "Ewolucja jako proces bez teleologii — brak z góry założonego celu.",
                  duration: 9
                },
                {
                  id: "m5-l18",
                  title: "Dlaczego współczesne gatunki nie są „bardziej rozwinięte\"",
                  desc: "Obalenie błędnego przekonania, że współczesne gatunki są „wyżej\" na drabinie ewolucyjnej.",
                  duration: 10
                },
                {
                  id: "m5-l19",
                  title: "Jak zapis kopalny testuje hipotezy ewolucyjne",
                  desc: "Wykorzystanie zapisu kopalnego do weryfikacji przewidywań teorii ewolucji.",
                  duration: 11
                }
            ]
          },
          {
            id: "m6",
            title: "Matematyka, statystyka i myślenie ilościowe",
            lessons: [
                {
                  id: "m6-l1",
                  title: "Średnia",
                  desc: "Średnia arytmetyczna jako miara tendencji centralnej.",
                  duration: 9
                },
                {
                  id: "m6-l2",
                  title: "Mediana",
                  desc: "Mediana i jej zalety przy danych z wartościami skrajnymi.",
                  duration: 10
                },
                {
                  id: "m6-l3",
                  title: "Rozrzut",
                  desc: "Miary rozrzutu danych i ich interpretacja.",
                  duration: 11
                },
                {
                  id: "m6-l4",
                  title: "Odchylenie standardowe",
                  desc: "Odchylenie standardowe jako miara zmienności w zbiorze danych.",
                  duration: 12
                },
                {
                  id: "m6-l5",
                  title: "Próba i populacja",
                  desc: "Różnica między próbą a populacją statystyczną.",
                  duration: 13
                },
                {
                  id: "m6-l6",
                  title: "Korelacja",
                  desc: "Korelacja między zmiennymi i jej interpretacja.",
                  duration: 14
                },
                {
                  id: "m6-l7",
                  title: "Regresja",
                  desc: "Analiza regresji — modelowanie zależności między zmiennymi.",
                  duration: 15
                },
                {
                  id: "m6-l8",
                  title: "Niepewność pomiaru",
                  desc: "Szacowanie i raportowanie niepewności w pomiarach paleontologicznych.",
                  duration: 8
                },
                {
                  id: "m6-l9",
                  title: "Przedziały ufności",
                  desc: "Przedziały ufności i ich znaczenie dla wiarygodności wyników.",
                  duration: 9
                },
                {
                  id: "m6-l10",
                  title: "Wielkość próby",
                  desc: "Dobór wielkości próby i jej wpływ na siłę statystyczną.",
                  duration: 10
                },
                {
                  id: "m6-l11",
                  title: "Bias",
                  desc: "Pojęcie biasu (obciążenia) i jego wpływu na wyniki analiz.",
                  duration: 11
                },
                {
                  id: "m6-l12",
                  title: "Sampling bias",
                  desc: "Obciążenie próbkowania w danych paleontologicznych i sposoby jego korygowania.",
                  duration: 12
                },
                {
                  id: "m6-l13",
                  title: "Outlier",
                  desc: "Wartości odstające i postępowanie z nimi w analizie danych.",
                  duration: 13
                },
                {
                  id: "m6-l14",
                  title: "Transformacja logarytmiczna",
                  desc: "Logarytmiczne przekształcenie danych i kiedy jest stosowane.",
                  duration: 14
                },
                {
                  id: "m6-l15",
                  title: "Podstawy testowania hipotez",
                  desc: "Testowanie hipotez statystycznych — hipoteza zerowa, p-value, błędy I i II rodzaju.",
                  duration: 15
                },
                {
                  id: "m6-l16",
                  title: "Wprowadzenie do analiz wielowymiarowych",
                  desc: "Podstawy metod wielowymiarowych — PCA i analiza skupień.",
                  duration: 8
                },
                {
                  id: "m6-l17",
                  title: "Wizualizacja danych",
                  desc: "Zasady skutecznej wizualizacji danych w prezentacjach wyników.",
                  duration: 9
                }
            ]
          }
      ]
    },
    {
      id: "etap-2",
      title: "Czytanie zapisu kopalnego",
      hours: "około 60 godzin",
      modules: [
          {
            id: "m7",
            title: "Czas geologiczny",
            lessons: [
                {
                  id: "m7-l1",
                  title: "Jednostki czasu geologicznego",
                  desc: "Hierarchia jednostek: eon → era → okres → epoka → wiek.",
                  duration: 9
                },
                {
                  id: "m7-l2",
                  title: "Geochronologia vs chronostratygrafia",
                  desc: "Różnica między jednostkami geochronologicznymi i chronostratygraficznymi.",
                  duration: 10
                },
                {
                  id: "m7-l3",
                  title: "International Chronostratigraphic Chart",
                  desc: "ICS jako oficjalny organ definiujący globalne jednostki chronostratygraficzne — aktualna wersja 2026/06.",
                  duration: 11
                },
                {
                  id: "m7-l4",
                  title: "Hadeik",
                  desc: "Najwcześniejszy eon w historii Ziemi — formowanie planety.",
                  duration: 12
                },
                {
                  id: "m7-l5",
                  title: "Archaik",
                  desc: "Eon archaiku — powstanie pierwszych mikroorganizmów i stromatolitów.",
                  duration: 13
                },
                {
                  id: "m7-l6",
                  title: "Proterozoik",
                  desc: "Eon proterozoiku — wzrost tlenu i pojawienie eukariontów.",
                  duration: 14
                },
                {
                  id: "m7-l7",
                  title: "Fanerozoik",
                  desc: "Eon fanerozoiku — era widocznego życia w zapisie kopalnym.",
                  duration: 15
                },
                {
                  id: "m7-l8",
                  title: "Paleozoik — przegląd",
                  desc: "Przegląd ery paleozoicznej i jej głównych wydarzeń.",
                  duration: 8
                },
                {
                  id: "m7-l9",
                  title: "Kambr",
                  desc: "Okres kambru — eksplozja kambryjska zróżnicowania życia.",
                  duration: 9
                },
                {
                  id: "m7-l10",
                  title: "Ordowik",
                  desc: "Okres ordowiku — radiacja morskich bezkręgowców.",
                  duration: 10
                },
                {
                  id: "m7-l11",
                  title: "Sylur",
                  desc: "Okres syluru — kolonizacja lądu przez pierwsze organizmy.",
                  duration: 11
                },
                {
                  id: "m7-l12",
                  title: "Dewon",
                  desc: "Okres dewonu — ewolucja ryb i pierwszych tetrapodów.",
                  duration: 12
                },
                {
                  id: "m7-l13",
                  title: "Karbon",
                  desc: "Okres karbonu — lasy węglotwórcze i ewolucja owodniowców.",
                  duration: 13
                },
                {
                  id: "m7-l14",
                  title: "Perm",
                  desc: "Okres permu — synapsydy i wielkie wymieranie permskie.",
                  duration: 14
                },
                {
                  id: "m7-l15",
                  title: "Mezozoik — przegląd",
                  desc: "Przegląd ery mezozoicznej — ery gadów.",
                  duration: 15
                },
                {
                  id: "m7-l16",
                  title: "Trias",
                  desc: "Okres triasu — odbudowa po wymieraniu i powstanie dinozaurów.",
                  duration: 8
                },
                {
                  id: "m7-l17",
                  title: "Jura",
                  desc: "Okres jury — złoty wiek dinozaurów i pterozaurów.",
                  duration: 9
                },
                {
                  id: "m7-l18",
                  title: "Kreda",
                  desc: "Okres kredy — ewolucja ptaków i kwiatowych oraz wymieranie K–Pg.",
                  duration: 10
                },
                {
                  id: "m7-l19",
                  title: "Kenozoik — przegląd",
                  desc: "Przegląd ery kenozoicznej — era ssaków.",
                  duration: 11
                },
                {
                  id: "m7-l20",
                  title: "Paleogen",
                  desc: "Okres paleogenu — radiacja ssaków po wymieraniu K–Pg.",
                  duration: 12
                },
                {
                  id: "m7-l21",
                  title: "Neogen",
                  desc: "Okres neogenu — ewolucja homininów i zmiany klimatyczne.",
                  duration: 13
                },
                {
                  id: "m7-l22",
                  title: "Czwartorzęd",
                  desc: "Okres czwartorzędu — epoka lodowcowa i ewolucja człowieka.",
                  duration: 14
                },
                {
                  id: "m7-l23",
                  title: "GSSP — Global Boundary Stratotype Section and Point",
                  desc: "Wzorcowe profile definiujące granice jednostek chronostratygraficznych.",
                  duration: 15
                }
            ]
          },
          {
            id: "m8",
            title: "Sedymentologia",
            lessons: [
                {
                  id: "m8-l1",
                  title: "Powstawanie osadów",
                  desc: "Mechanizmy powstawania osadów i czynniki kontrolujące depozycję.",
                  duration: 9
                },
                {
                  id: "m8-l2",
                  title: "Wielkość ziarna",
                  desc: "Klasyfikacja osadów według wielkości ziarna.",
                  duration: 10
                },
                {
                  id: "m8-l3",
                  title: "Sortowanie",
                  desc: "Stopień sortowania osadu i jego znaczenie środowiskowe.",
                  duration: 11
                },
                {
                  id: "m8-l4",
                  title: "Obtoczenie",
                  desc: "Kształt ziaren i otoczenie jako wskaźnik transportu.",
                  duration: 12
                },
                {
                  id: "m8-l5",
                  title: "Transport rzeczny",
                  desc: "Cechy osadów transportowanych przez rzeki.",
                  duration: 13
                },
                {
                  id: "m8-l6",
                  title: "Transport eoliczny",
                  desc: "Osady transportowane przez wiatr — środowiska pustynne.",
                  duration: 14
                },
                {
                  id: "m8-l7",
                  title: "Transport morski",
                  desc: "Osady transportowane w środowisku morskim.",
                  duration: 15
                },
                {
                  id: "m8-l8",
                  title: "Prądy",
                  desc: "Rola prądów w transporcie i depozycji osadów.",
                  duration: 8
                },
                {
                  id: "m8-l9",
                  title: "Turbidyty",
                  desc: "Osady turbidytowe — powstawanie w prądach zawiesinowych.",
                  duration: 9
                },
                {
                  id: "m8-l10",
                  title: "Ripple marks",
                  desc: "Zmarszczki ripple marks jako wskaźnik kierunku prądu.",
                  duration: 10
                },
                {
                  id: "m8-l11",
                  title: "Cross-bedding",
                  desc: "Warstwowanie przekąte (cross-bedding) i jego interpretacja.",
                  duration: 11
                },
                {
                  id: "m8-l12",
                  title: "Mud cracks",
                  desc: "Spękania błotne (mud cracks) jako wskaźnik wysychania.",
                  duration: 12
                },
                {
                  id: "m8-l13",
                  title: "Graded bedding",
                  desc: "Warstwowanie gradacyjne i jego geneza.",
                  duration: 13
                },
                {
                  id: "m8-l14",
                  title: "Kanały rzeczne",
                  desc: "Sedymentologia kanałów rzecznych i ich osadów.",
                  duration: 14
                },
                {
                  id: "m8-l15",
                  title: "Delty",
                  desc: "Środowiska deltowe i ich charakterystyka sedymentologiczna.",
                  duration: 15
                },
                {
                  id: "m8-l16",
                  title: "Równiny zalewowe",
                  desc: "Osady równin zalewowych i ich formowanie.",
                  duration: 8
                },
                {
                  id: "m8-l17",
                  title: "Jeziora",
                  desc: "Środowiska jeziorne i cechy ich osadów.",
                  duration: 9
                },
                {
                  id: "m8-l18",
                  title: "Plaże",
                  desc: "Sedymentologia środowisk plażowych.",
                  duration: 10
                },
                {
                  id: "m8-l19",
                  title: "Szelf morski",
                  desc: "Osady szelfu morskiego i procesy depozycji.",
                  duration: 11
                },
                {
                  id: "m8-l20",
                  title: "Głębokie morze",
                  desc: "Środowiska głębokomorskie i ich osady.",
                  duration: 12
                },
                {
                  id: "m8-l21",
                  title: "Pustynie",
                  desc: "Sedymentologia środowisk pustynnych i eolicznych.",
                  duration: 13
                },
                {
                  id: "m8-l22",
                  title: "Środowiska węglanowe",
                  desc: "Środowiska węglanowe i ich znaczenie dla zapisu kopalnego.",
                  duration: 14
                }
            ]
,
            practice: {
              title: "Rekonstrukcja środowiska z profilu",
              desc: "Uczeń dostaje profil: piaskowiec → mułowiec → iłowiec + skamieniałości. Ma zrekonstruować możliwe zmiany środowiska depozycyjnego."
            }
          },
          {
            id: "m9",
            title: "Stratygrafia",
            lessons: [
                {
                  id: "m9-l1",
                  title: "Prawo superpozycji",
                  desc: "Podstawowa zasada — warstwy niższe są starsze od wyższych (przy braku zaburzeń).",
                  duration: 9
                },
                {
                  id: "m9-l2",
                  title: "Pierwotna poziomość",
                  desc: "Zasada pierwotnej poziomości osadów i jej założenia.",
                  duration: 10
                },
                {
                  id: "m9-l3",
                  title: "Ciągłość lateralna",
                  desc: "Zasada ciągłości lateralnej warstw osadowych.",
                  duration: 11
                },
                {
                  id: "m9-l4",
                  title: "Cross-cutting relationships",
                  desc: "Zasada relacji przecinających — ciało przecinające jest młodsze.",
                  duration: 12
                },
                {
                  id: "m9-l5",
                  title: "Inkluzje",
                  desc: "Zasada inkluzji — fragment włącznie jest starszy od skały, która go zawiera.",
                  duration: 13
                },
                {
                  id: "m9-l6",
                  title: "Nieciągłości",
                  desc: "Powierzchnie nieciągłości sedymentacyjnej i ich znaczenie.",
                  duration: 14
                },
                {
                  id: "m9-l7",
                  title: "Unconformities",
                  desc: "Niezgody (unconformities) — przerwy w zapisie stratygraficznym.",
                  duration: 15
                },
                {
                  id: "m9-l8",
                  title: "Litostratygrafia",
                  desc: "Klasyfikacja warstw na podstawie cech litologicznych.",
                  duration: 8
                },
                {
                  id: "m9-l9",
                  title: "Biostratygrafia",
                  desc: "Wykorzystanie skamieniałości do podziału i korelacji warstw.",
                  duration: 9
                },
                {
                  id: "m9-l10",
                  title: "Chronostratygrafia",
                  desc: "Podział jednostek skalnych według wieku geologicznego.",
                  duration: 10
                },
                {
                  id: "m9-l11",
                  title: "Magnetostratygrafia",
                  desc: "Wykorzystanie rewersji pola magnetycznego w stratygrafii.",
                  duration: 11
                },
                {
                  id: "m9-l12",
                  title: "Chemostratygrafia",
                  desc: "Zastosowanie zmian chemicznych w profilach stratygraficznych.",
                  duration: 12
                },
                {
                  id: "m9-l13",
                  title: "Sekwencje stratygraficzne",
                  desc: "Analiza sekwencji i cykli depozycyjnych.",
                  duration: 13
                },
                {
                  id: "m9-l14",
                  title: "Korelacja profili",
                  desc: "Metody korelacji profili stratygraficznych między stanowiskami.",
                  duration: 14
                },
                {
                  id: "m9-l15",
                  title: "Skamieniałości przewodnie",
                  desc: "Skamieniałości przewodnie (index fossils) i kryteria ich stosowania.",
                  duration: 15
                }
            ]
,
            practice: {
              title: "Korelacja profili",
              desc: "Uczeń dostaje dwa odwierty lub dwa profile skalne i musi je skorelować stratygraficznie."
            }
          },
          {
            id: "m10",
            title: "Datowanie",
            lessons: [
                {
                  id: "m10-l1",
                  title: "Datowanie względne vs numeryczne",
                  desc: "Podstawowe rozróżnienie między datowaniem względnym a numerycznym (bezwzględnym).",
                  duration: 9
                },
                {
                  id: "m10-l2",
                  title: "Half-life",
                  desc: "Pojęcie okresu półtrwania i jego rola w datowaniu radiometrycznym.",
                  duration: 10
                },
                {
                  id: "m10-l3",
                  title: "Rozpad promieniotwórczy",
                  desc: "Mechanizm rozpadu promieniotwórczego izotopów.",
                  duration: 11
                },
                {
                  id: "m10-l4",
                  title: "Parent isotope",
                  desc: "Izotop macierzysty i jego rola w systemie datowania.",
                  duration: 12
                },
                {
                  id: "m10-l5",
                  title: "Daughter isotope",
                  desc: "Izotop potomny jako produkt rozpadu i miara wieku.",
                  duration: 13
                },
                {
                  id: "m10-l6",
                  title: "U-Pb",
                  desc: "Metoda datowania uran-ołów (U-Pb) i jej zastosowania.",
                  duration: 14
                },
                {
                  id: "m10-l7",
                  title: "K-Ar / Ar-Ar",
                  desc: "Metody datowania potasowo-argonowe i ich ograniczenia.",
                  duration: 15
                },
                {
                  id: "m10-l8",
                  title: "Radiocarbon — ograniczenia",
                  desc: "Datowanie radiowęglowe i jego ograniczenia wiekowe.",
                  duration: 8
                },
                {
                  id: "m10-l9",
                  title: "Datowanie popiołów wulkanicznych",
                  desc: "Wykorzystanie popiołów wulkanicznych do datowania warstw ze skamieniałościami.",
                  duration: 9
                },
                {
                  id: "m10-l10",
                  title: "Magnetostratygrafia w datowaniu",
                  desc: "Zastosowanie magnetostratygrafii do datowania profili.",
                  duration: 10
                },
                {
                  id: "m10-l11",
                  title: "Biostratygrafia w datowaniu",
                  desc: "Użycie biostratygrafii jako metody datowania względnego.",
                  duration: 11
                },
                {
                  id: "m10-l12",
                  title: "Kalibracja wieku",
                  desc: "Kalibracja datowań i łączenie różnych metod.",
                  duration: 12
                },
                {
                  id: "m10-l13",
                  title: "Niepewności datowań",
                  desc: "Szacowanie i raportowanie niepewności w datowaniach geologicznych.",
                  duration: 13
                }
            ]
          },
          {
            id: "m11",
            title: "Tafonomia",
            lessons: [
                {
                  id: "m11-l1",
                  title: "Śmierć organizmu",
                  desc: "Pierwszy etap procesu tafonomicznego — śmierć organizmu.",
                  duration: 9
                },
                {
                  id: "m11-l2",
                  title: "Rozkład",
                  desc: "Procesy rozkładu tkanek miękkich przed fosylizacją.",
                  duration: 10
                },
                {
                  id: "m11-l3",
                  title: "Scavenging",
                  desc: "Zjadanie szczątków przez padlinożerców i jego wpływ na zachowanie.",
                  duration: 11
                },
                {
                  id: "m11-l4",
                  title: "Disarticulation",
                  desc: "Rozpadanie się szkieletów na pojedyncze elementy.",
                  duration: 12
                },
                {
                  id: "m11-l5",
                  title: "Transport",
                  desc: "Transport szczątków przed ostatecznym pogrzebaniem.",
                  duration: 13
                },
                {
                  id: "m11-l6",
                  title: "Abrasion",
                  desc: "Ścieranie i zaokrąglanie powierzchni kości podczas transportu.",
                  duration: 14
                },
                {
                  id: "m11-l7",
                  title: "Weathering",
                  desc: "Wietrzenie i niszczenie powierzchni kości przed pogrzebaniem.",
                  duration: 15
                },
                {
                  id: "m11-l8",
                  title: "Burial",
                  desc: "Pogrzebanie szczątków — kluczowy etap dla zachowania w zapisie kopalnym.",
                  duration: 8
                },
                {
                  id: "m11-l9",
                  title: "Mineralizacja",
                  desc: "Proces mineralizacji tkanek organicznych w skamieniałości.",
                  duration: 9
                },
                {
                  id: "m11-l10",
                  title: "Permineralizacja",
                  desc: "Wnikanie roztworów mineralnych w pory materiału organicznego.",
                  duration: 10
                },
                {
                  id: "m11-l11",
                  title: "Replacement",
                  desc: "Zastępowanie materiału organicznego minerałami.",
                  duration: 11
                },
                {
                  id: "m11-l12",
                  title: "Recrystallization",
                  desc: "Rekrystalizacja pierwotnego materiału skamieniałości.",
                  duration: 12
                },
                {
                  id: "m11-l13",
                  title: "Carbonization",
                  desc: "Zachowanie jako film węglowy — kompresja szczątków.",
                  duration: 13
                },
                {
                  id: "m11-l14",
                  title: "Mold",
                  desc: "Forma zewnętrzna (mold) — odlew negatywowy kształtu organizmu.",
                  duration: 14
                },
                {
                  id: "m11-l15",
                  title: "Cast",
                  desc: "Odlew pozytywny (cast) wypełniający formę negatywową.",
                  duration: 15
                },
                {
                  id: "m11-l16",
                  title: "Compression",
                  desc: "Kompresja i spłaszczenie szczątków podczas fosylizacji.",
                  duration: 8
                },
                {
                  id: "m11-l17",
                  title: "Exceptional preservation",
                  desc: "Wyjątkowe zachowanie tkanek miękkich — stanowiska Lagerstätten.",
                  duration: 9
                },
                {
                  id: "m11-l18",
                  title: "Konservat-Lagerstätten",
                  desc: "Stanowiska o wyjątkowym zachowaniu kompletnych organizmów.",
                  duration: 10
                },
                {
                  id: "m11-l19",
                  title: "Koncentracje kości",
                  desc: "Naturalne koncentracje kości i ich geneza.",
                  duration: 11
                },
                {
                  id: "m11-l20",
                  title: "Bonebeds",
                  desc: "Stanowiska masowego nagromadzenia kości (bonebeds).",
                  duration: 12
                },
                {
                  id: "m11-l21",
                  title: "Tafonomiczne biasy",
                  desc: "Tafonomiczne obciążenia zapisu kopalnego i ich rozpoznawanie.",
                  duration: 13
                }
            ]
          },
          {
            id: "m12",
            title: "Paleoekologia i paleoklimat",
            lessons: [
                {
                  id: "m12-l1",
                  title: "Proxy — skamieniałości",
                  desc: "Skamieniałości jako wskaźniki (proxy) dawnych warunków środowiskowych.",
                  duration: 9
                },
                {
                  id: "m12-l2",
                  title: "Pyłki",
                  desc: "Analiza pyłku jako narzędzie rekonstrukcji roślinności i klimatu.",
                  duration: 10
                },
                {
                  id: "m12-l3",
                  title: "Otwornice",
                  desc: "Otwornice jako wskaźniki środowiska morskiego i temperatury.",
                  duration: 11
                },
                {
                  id: "m12-l4",
                  title: "Stabilne izotopy",
                  desc: "Analiza stabilnych izotopów w rekonstrukcji klimatu i diety.",
                  duration: 12
                },
                {
                  id: "m12-l5",
                  title: "Paleosole",
                  desc: "Skamieniałe gleby (paleosole) jako wskaźniki warunków na lądzie.",
                  duration: 13
                },
                {
                  id: "m12-l6",
                  title: "Węgiel",
                  desc: "Złoża węgla jako wskaźniki dawnej roślinności i środowisk.",
                  duration: 14
                },
                {
                  id: "m12-l7",
                  title: "Evaporites",
                  desc: "Skały ewaporatowe jako wskaźniki klimatu suchego i wysokiego zasolenia.",
                  duration: 15
                },
                {
                  id: "m12-l8",
                  title: "Osady lodowcowe",
                  desc: "Osady lodowcowe jako dowody zlodowaceń w przeszłości.",
                  duration: 8
                },
                {
                  id: "m12-l9",
                  title: "Paleogeografia",
                  desc: "Rekonstrukcja paleogeografii i rozmieszczenia kontynentów.",
                  duration: 9
                },
                {
                  id: "m12-l10",
                  title: "Rekonstrukcja temperatury",
                  desc: "Metody rekonstrukcji dawnych temperatur na podstawie proxy.",
                  duration: 10
                },
                {
                  id: "m12-l11",
                  title: "Rekonstrukcja wilgotności",
                  desc: "Szacowanie dawnej wilgotności i opadów z danych kopalnych.",
                  duration: 11
                },
                {
                  id: "m12-l12",
                  title: "Głębokość wody",
                  desc: "Rekonstrukcja głębokości zbiorników wodnych z zapisu sedymentologicznego.",
                  duration: 12
                },
                {
                  id: "m12-l13",
                  title: "Zasolenie",
                  desc: "Szacowanie dawnego zasolenia wód na podstawie skamieniałości i osadów.",
                  duration: 13
                },
                {
                  id: "m12-l14",
                  title: "Produktywność",
                  desc: "Rekonstrukcja dawnej produktywności ekosystemów.",
                  duration: 14
                },
                {
                  id: "m12-l15",
                  title: "Roślinność",
                  desc: "Rekonstrukcja pokrywy roślinnej na podstawie kopalnych szczątków.",
                  duration: 15
                },
                {
                  id: "m12-l16",
                  title: "Struktura ekosystemu",
                  desc: "Rekonstrukcja struktury dawnych ekosystemów i sieci troficznych.",
                  duration: 8
                }
            ]
          }
      ]
    },
    {
      id: "etap-3",
      title: "Historia życia",
      hours: "około 40 godzin",
      modules: [
          {
            id: "m13",
            title: "Historia życia na Ziemi",
            lessons: [
                {
                  id: "m13-l1",
                  title: "Precambrian — początki życia",
                  desc: "Najwcześniejsze ślady życia na Ziemi i warunki środowiska prekambryjskiego.",
                  duration: 9
                },
                {
                  id: "m13-l2",
                  title: "Mikroorganizmy prekambryjskie",
                  desc: "Pierwsze mikroorganizmy i ich rola w kształtowaniu środowiska.",
                  duration: 10
                },
                {
                  id: "m13-l3",
                  title: "Stromatolity",
                  desc: "Stromatolity jako jedne z najstarszych dowodów życia na Ziemi.",
                  duration: 11
                },
                {
                  id: "m13-l4",
                  title: "Wzrost tlenu",
                  desc: "Wielkie tlenowanie atmosfery i jego wpływ na ewolucję życia.",
                  duration: 12
                },
                {
                  id: "m13-l5",
                  title: "Eukarionty",
                  desc: "Pojawienie się organizmów eukariotycznych w zapisie kopalnym.",
                  duration: 13
                },
                {
                  id: "m13-l6",
                  title: "Wielokomórkowość",
                  desc: "Ewolucja wielokomórkowości i pierwsze organizmy złożone.",
                  duration: 14
                },
                {
                  id: "m13-l7",
                  title: "Biota ediakarska",
                  desc: "Biota ediakarska — enigmatyczne organizmy końca prekambry.",
                  duration: 15
                },
                {
                  id: "m13-l8",
                  title: "Radiacja kambryjska",
                  desc: "Eksplozja kambryjska — nagłe zróżnicowanie form życiowych.",
                  duration: 8
                },
                {
                  id: "m13-l9",
                  title: "Pierwsze złożone ekosystemy morskie",
                  desc: "Formowanie się złożonych ekosystemów morskich w paleozoiku.",
                  duration: 9
                },
                {
                  id: "m13-l10",
                  title: "Kolonizacja lądu",
                  desc: "Pierwsze organizmy kolonizujące środowisko lądowe.",
                  duration: 10
                },
                {
                  id: "m13-l11",
                  title: "Rośliny naczyniowe",
                  desc: "Ewolucja roślin naczyniowych i ich ekspansja na lądzie.",
                  duration: 11
                },
                {
                  id: "m13-l12",
                  title: "Stawonogi lądowe",
                  desc: "Kolonizacja lądu przez stawonogi i ich radiacja.",
                  duration: 12
                },
                {
                  id: "m13-l13",
                  title: "Ewolucja ryb",
                  desc: "Główne etapy ewolucji ryb w paleozoiku.",
                  duration: 13
                },
                {
                  id: "m13-l14",
                  title: "Tetrapody",
                  desc: "Przejście z wody na ląd — ewolucja pierwszych tetrapodów.",
                  duration: 14
                },
                {
                  id: "m13-l15",
                  title: "Owodniowce",
                  desc: "Pojawienie się owodniowców i niezależności od środowiska wodnego.",
                  duration: 15
                },
                {
                  id: "m13-l16",
                  title: "Synapsydy",
                  desc: "Dominacja synapsydów w permie — przodkowie ssaków.",
                  duration: 8
                },
                {
                  id: "m13-l17",
                  title: "Wymieranie permskie",
                  desc: "Największe masowe wymieranie w historii Ziemi — koniec permu.",
                  duration: 9
                },
                {
                  id: "m13-l18",
                  title: "Odbudowa po wymieraniu permskim",
                  desc: "Odbudowa ekosystemów po wielkim wymieraniu permskim.",
                  duration: 10
                },
                {
                  id: "m13-l19",
                  title: "Archozaury",
                  desc: "Rozwój i radiacja archozaurów w triasie.",
                  duration: 11
                },
                {
                  id: "m13-l20",
                  title: "Dinozaury",
                  desc: "Powstanie i ekspansja dinozaurów w mezozoiku.",
                  duration: 12
                },
                {
                  id: "m13-l21",
                  title: "Pterozuary",
                  desc: "Ewolucja i zróżnicowanie pterozaurów — pierwszych kręgowców latających.",
                  duration: 13
                },
                {
                  id: "m13-l22",
                  title: "Gady morskie",
                  desc: "Mezozoiczne gady morskie — ichtiozaury, plezjozaury i mozazaury.",
                  duration: 14
                },
                {
                  id: "m13-l23",
                  title: "Pierwsze ssaki",
                  desc: "Pochodzenie ssaków od terapsydów w mezozoiku.",
                  duration: 15
                },
                {
                  id: "m13-l24",
                  title: "Pochodzenie ptaków",
                  desc: "Ewolucja ptaków z teropodów — Archaeopteryx i inne formy przejściowe.",
                  duration: 8
                },
                {
                  id: "m13-l25",
                  title: "Ewolucja roślin kwiatowych",
                  desc: "Pojawienie się i radiacja okrytonasiennych w kredzie.",
                  duration: 9
                },
                {
                  id: "m13-l26",
                  title: "Wymieranie K–Pg",
                  desc: "Masowe wymieranie na granicy kredy i paleogenu — koniec dinozaurów nienaucjonych.",
                  duration: 10
                },
                {
                  id: "m13-l27",
                  title: "Radiacja ssaków",
                  desc: "Szybka radiacja ssaków po wymieraniu K–Pg w kenozoiku.",
                  duration: 11
                },
                {
                  id: "m13-l28",
                  title: "Radiacja ptaków",
                  desc: "Rozwój i zróżniczenie nowożytnych ptaków w kenozoiku.",
                  duration: 12
                },
                {
                  id: "m13-l29",
                  title: "Ewolucja waleni",
                  desc: "Przejście ssaków lądowych do środowiska wodnego — ewolucja waleni.",
                  duration: 13
                },
                {
                  id: "m13-l30",
                  title: "Trawożercy",
                  desc: "Ewolucja dużych trawożerców i adaptacji do pożywienia roślinnego.",
                  duration: 14
                },
                {
                  id: "m13-l31",
                  title: "Rozwój traw",
                  desc: "Ekspansja traw i jej wpływ na ewolucję fauny.",
                  duration: 15
                },
                {
                  id: "m13-l32",
                  title: "Zmiany klimatu kenozoiku",
                  desc: "Zmiany klimatyczne w kenozoiku i ich wpływ na ewolucję.",
                  duration: 8
                },
                {
                  id: "m13-l33",
                  title: "Homininy",
                  desc: "Ewolucja homininów i linii prowadzącej do człowieka.",
                  duration: 9
                },
                {
                  id: "m13-l34",
                  title: "Plejstoceńska megafauna",
                  desc: "Megafauna plejstoceńska i wymieranie wielkich ssaków.",
                  duration: 10
                }
            ]
          }
      ]
    },
    {
      id: "etap-4",
      title: "Organizmy kopalne",
      hours: "około 70 godzin",
      modules: [
          {
            id: "m14",
            title: "Anatomia porównawcza",
            lessons: [
                {
                  id: "m14-l1",
                  title: "Terminologia anatomiczna",
                  desc: "Podstawowe terminy kierunkowe: anterior/posterior, dorsal/ventral, medial/lateral, proximal/distal.",
                  duration: 9
                },
                {
                  id: "m14-l2",
                  title: "Czaszka",
                  desc: "Budowa czaszki kręgowców i jej elementy.",
                  duration: 10
                },
                {
                  id: "m14-l3",
                  title: "Żuchwa",
                  desc: "Struktura żuchwy i jej ewolucyjne znaczenie.",
                  duration: 11
                },
                {
                  id: "m14-l4",
                  title: "Kręgi",
                  desc: "Budowa kręgów i podział kręgosłupa.",
                  duration: 12
                },
                {
                  id: "m14-l5",
                  title: "Żebra",
                  desc: "Struktura żeber i ich rola w szkielecie osiowym.",
                  duration: 13
                },
                {
                  id: "m14-l6",
                  title: "Obręcz barkowa",
                  desc: "Budowa obręczy barkowej i jej ewolucja.",
                  duration: 14
                },
                {
                  id: "m14-l7",
                  title: "Kończyna przednia",
                  desc: "Anatomia kończyny przedniej kręgowców.",
                  duration: 15
                },
                {
                  id: "m14-l8",
                  title: "Miednica",
                  desc: "Budowa miednicy i jej znaczenie systematyczne u kręgowców.",
                  duration: 8
                },
                {
                  id: "m14-l9",
                  title: "Kończyna tylna",
                  desc: "Anatomia kończyny tylnej i jej adaptacje lokomocyjne.",
                  duration: 9
                },
                {
                  id: "m14-l10",
                  title: "Budowa zęba",
                  desc: "Struktura zęba i elementy jego anatomiczne.",
                  duration: 10
                },
                {
                  id: "m14-l11",
                  title: "Typy uzębienia",
                  desc: "Różne typy uzębienia i ich związek z dietą.",
                  duration: 11
                },
                {
                  id: "m14-l12",
                  title: "Stawy",
                  desc: "Budowa stawów i ich biomechanika.",
                  duration: 12
                },
                {
                  id: "m14-l13",
                  title: "Przyczepy mięśni",
                  desc: "Miejsca przyczepów mięśni na kościach i ich interpretacja.",
                  duration: 13
                },
                {
                  id: "m14-l14",
                  title: "Ontogeneza kości",
                  desc: "Rozwój i wzrost kości u kręgowców — znaczenie dla interpretacji wieku.",
                  duration: 14
                },
                {
                  id: "m14-l15",
                  title: "Histologia kości",
                  desc: "Mikroskopowa budowa kości i typy tkanki kostnej.",
                  duration: 15
                },
                {
                  id: "m14-l16",
                  title: "Asymetria",
                  desc: "Naturalna asymetria bilateralna i jej pomiary.",
                  duration: 8
                },
                {
                  id: "m14-l17",
                  title: "Patologie",
                  desc: "Zmiany patologiczne na kościach kopalnych i ich interpretacja.",
                  duration: 9
                },
                {
                  id: "m14-l18",
                  title: "Zmienność osobnicza",
                  desc: "Zmienność wewnątrzgatunkowa i jej zakres w materiale kopalnym.",
                  duration: 10
                },
                {
                  id: "m14-l19",
                  title: "Dymorfizm",
                  desc: "Dymorfizm płciowy w szkieletach kopalnych i jego rozpoznawanie.",
                  duration: 11
                },
                {
                  id: "m14-l20",
                  title: "Deformacje tafonomiczne",
                  desc: "Deformacje kości spowodowane procesami tafonomicznymi i ich odróżnianie od patologii.",
                  duration: 12
                }
            ]
          },
          {
            id: "m15",
            title: "Paleontologia bezkręgowców",
            lessons: [
                {
                  id: "m15-l1",
                  title: "Porifera",
                  desc: "Gąbki (Porifera) — budowa, rozpoznawanie, zakres czasowy i środowisko.",
                  duration: 9
                },
                {
                  id: "m15-l2",
                  title: "Cnidaria",
                  desc: "Parzydełkowce (Cnidaria) — budowa, kopalne przedstawiciele i znaczenie.",
                  duration: 10
                },
                {
                  id: "m15-l3",
                  title: "Brachiopoda",
                  desc: "Ramienionogi (Brachiopoda) — budowa i znaczenie paleontologiczne.",
                  duration: 11
                },
                {
                  id: "m15-l4",
                  title: "Mollusca",
                  desc: "Mięczaki (Mollusca) — przegląd grupy i jej zróżnicowanie.",
                  duration: 12
                },
                {
                  id: "m15-l5",
                  title: "Bivalvia",
                  desc: "Małże (Bivalvia) — budowa, środowisko i znaczenie stratygraficzne.",
                  duration: 13
                },
                {
                  id: "m15-l6",
                  title: "Gastropoda",
                  desc: "Ślimaki (Gastropoda) — ewolucja i ekologia kopalna.",
                  duration: 14
                },
                {
                  id: "m15-l7",
                  title: "Cephalopoda",
                  desc: "Głowonogi (Cephalopoda) — amonity i belemnity jako skamieniałości przewodnie.",
                  duration: 15
                },
                {
                  id: "m15-l8",
                  title: "Arthropoda",
                  desc: "Stawonogi (Arthropoda) — zróżnicowanie i znaczenie kopalne.",
                  duration: 8
                },
                {
                  id: "m15-l9",
                  title: "Trilobita",
                  desc: "Trylobity (Trilobita) — budowa, ewolucja i znaczenie stratygraficzne.",
                  duration: 9
                },
                {
                  id: "m15-l10",
                  title: "Bryozoa",
                  desc: "Mszywioły (Bryozoa) — kolonijne bezkręgowce i ich zapis kopalny.",
                  duration: 10
                },
                {
                  id: "m15-l11",
                  title: "Echinodermata",
                  desc: "Szkarłupnie (Echinodermata) — budowa i ewolucja.",
                  duration: 11
                },
                {
                  id: "m15-l12",
                  title: "Graptolithina",
                  desc: "Graptolity (Graptolithina) — ważne skamieniałości przewodnie paleozoiku.",
                  duration: 12
                }
            ]
          },
          {
            id: "m16",
            title: "Paleontologia kręgowców",
            lessons: [
                {
                  id: "m16-l1",
                  title: "Początki kręgowców",
                  desc: "Geneza kręgowców i najwcześniejsze formy w zapisie kopalnym.",
                  duration: 9
                },
                {
                  id: "m16-l2",
                  title: "Bezżuchwowce",
                  desc: "Wczesne bezżuchwowce i ich budowa.",
                  duration: 10
                },
                {
                  id: "m16-l3",
                  title: "Szczękowce",
                  desc: "Ewolucja szczęk — przełom w historii kręgowców.",
                  duration: 11
                },
                {
                  id: "m16-l4",
                  title: "Chrzęstnoszkieletowe",
                  desc: "Rekiny i rajdy — budowa i zapis kopalny chrzęstnoszkieletowych.",
                  duration: 12
                },
                {
                  id: "m16-l5",
                  title: "Kostnoszkieletowe",
                  desc: "Ryby kostnoszkieletowe i ich zróżnicowanie.",
                  duration: 13
                },
                {
                  id: "m16-l6",
                  title: "Sarcopterygii",
                  desc: "Mięśniopłetwe (Sarcopterygii) — przodkowie tetrapodów.",
                  duration: 14
                },
                {
                  id: "m16-l7",
                  title: "Przejście woda–ląd",
                  desc: "Ewolucyjne przejście od ryb do zwierząt lądowych.",
                  duration: 15
                },
                {
                  id: "m16-l8",
                  title: "Wczesne tetrapody",
                  desc: "Pierwsze tetrapody i adaptacje do środowiska lądowego.",
                  duration: 8
                },
                {
                  id: "m16-l9",
                  title: "Płazy",
                  desc: "Ewolucja i zróżnicowanie płazów kopalnych.",
                  duration: 9
                },
                {
                  id: "m16-l10",
                  title: "Owodniowce",
                  desc: "Pojawienie się owodniowców i amniota.",
                  duration: 10
                },
                {
                  id: "m16-l11",
                  title: "Synapsydy",
                  desc: "Synapsydy — linia prowadząca do ssaków.",
                  duration: 11
                },
                {
                  id: "m16-l12",
                  title: "Terapsydy",
                  desc: "Terapsydy — zaawansowane synapsydy permskie.",
                  duration: 12
                },
                {
                  id: "m16-l13",
                  title: "Pochodzenie ssaków",
                  desc: "Ewolucyjne pochodzenie ssaków od terapsydów.",
                  duration: 13
                },
                {
                  id: "m16-l14",
                  title: "Zauropsydy",
                  desc: "Zauropsydy — gałąź prowadząca do gadów i ptaków.",
                  duration: 14
                },
                {
                  id: "m16-l15",
                  title: "Diapsydy",
                  desc: "Diapsydy i ich zróżnicowanie ewolucyjne.",
                  duration: 15
                },
                {
                  id: "m16-l16",
                  title: "Lepidozaury",
                  desc: "Lepidozaury — łuskonośne i hatterie.",
                  duration: 8
                },
                {
                  id: "m16-l17",
                  title: "Archozaury",
                  desc: "Archozaury — linia prowadząca do krokodyli, pterozaurów i dinozaurów.",
                  duration: 9
                },
                {
                  id: "m16-l18",
                  title: "Krokodylomorfy",
                  desc: "Ewolucja krokodylomorfów i ich zróżnicowanie.",
                  duration: 10
                },
                {
                  id: "m16-l19",
                  title: "Pterozuary",
                  desc: "Pterozuary — pierwsze kręgowce zdolne do aktywnego lotu.",
                  duration: 11
                },
                {
                  id: "m16-l20",
                  title: "Dinosauria",
                  desc: "Przegląd dinozaurów i ich pozycja filogenetyczna.",
                  duration: 12
                },
                {
                  id: "m16-l21",
                  title: "Saurischia",
                  desc: "Gadowo biodrowe (Saurischia) — teropody i zauropody.",
                  duration: 13
                },
                {
                  id: "m16-l22",
                  title: "Theropoda",
                  desc: "Teropody — drapieżne dinozaury i przodkowie ptaków.",
                  duration: 14
                },
                {
                  id: "m16-l23",
                  title: "Sauropodomorpha",
                  desc: "Sauropodomorfy — gigantyczne dinozaury roślinożerne.",
                  duration: 15
                },
                {
                  id: "m16-l24",
                  title: "Ornithischia",
                  desc: "Ptasiomiedniczne (Ornithischia) — roślinożerne dinozaury.",
                  duration: 8
                },
                {
                  id: "m16-l25",
                  title: "Pochodzenie ptaków",
                  desc: "Ewolucja ptaków z teropodów i formy przejściowe.",
                  duration: 9
                },
                {
                  id: "m16-l26",
                  title: "Gady morskie",
                  desc: "Mezozoiczne gady morskie — ichtiozaury, plezjozaury i mozazaury.",
                  duration: 10
                },
                {
                  id: "m16-l27",
                  title: "Ssaki mezozoiczne",
                  desc: "Wczesne ssaki współistniejące z dinozaurami.",
                  duration: 11
                },
                {
                  id: "m16-l28",
                  title: "Ssaki kenozoiczne",
                  desc: "Radiacja i zróżnicowanie ssaków w kenozoiku.",
                  duration: 12
                },
                {
                  id: "m16-l29",
                  title: "Ewolucja naczelnych",
                  desc: "Ewolucja naczelnych i ich głównych linii.",
                  duration: 13
                },
                {
                  id: "m16-l30",
                  title: "Homininy",
                  desc: "Ewolucja homininów i pochodzenie człowieka.",
                  duration: 14
                }
            ]
          },
          {
            id: "m17",
            title: "Paleobotanika",
            lessons: [
                {
                  id: "m17-l1",
                  title: "Pierwsze fotosyntetyzujące organizmy",
                  desc: "Najwcześniejsze organizmy fotosyntetyzujące i ich rola w zmianie atmosfery.",
                  duration: 9
                },
                {
                  id: "m17-l2",
                  title: "Algi",
                  desc: "Kopalne algi i ich znaczenie paleoekologiczne.",
                  duration: 10
                },
                {
                  id: "m17-l3",
                  title: "Kolonizacja lądu",
                  desc: "Pierwsze rośliny lądowe i adaptacje do środowiska powietrznego.",
                  duration: 11
                },
                {
                  id: "m17-l4",
                  title: "Bryofity",
                  desc: "Mszaaki (bryofity) — wczesne rośliny lądowe bez systemu naczyniowego.",
                  duration: 12
                },
                {
                  id: "m17-l5",
                  title: "Rośliny naczyniowe",
                  desc: "Ewolucja roślin naczyniowych i ich znaczenie.",
                  duration: 13
                },
                {
                  id: "m17-l6",
                  title: "Widłaki",
                  desc: "Widłaki (Lycopodiophyta) i ich kopalne drzewiaste formy.",
                  duration: 14
                },
                {
                  id: "m17-l7",
                  title: "Skrzypy",
                  desc: "Skrzypy (Equisetaceae) i ich wymarli przedstawiciele.",
                  duration: 15
                },
                {
                  id: "m17-l8",
                  title: "Paprocie",
                  desc: "Paprocie i ich zapis kopalny.",
                  duration: 8
                },
                {
                  id: "m17-l9",
                  title: "Rośliny nasienne",
                  desc: "Ewolucja roślin nasiennych — przełom w rozmnażaniu.",
                  duration: 9
                },
                {
                  id: "m17-l10",
                  title: "Nagonasienne",
                  desc: "Nagonasienne (gymnospermy) i ich zróżnicowanie.",
                  duration: 10
                },
                {
                  id: "m17-l11",
                  title: "Sagowce",
                  desc: "Sagowce (Cycadales) — żywe skamieniałości.",
                  duration: 11
                },
                {
                  id: "m17-l12",
                  title: "Ginkgo",
                  desc: "Miłorząb (Ginkgo) — reliktowa roślina kopalna.",
                  duration: 12
                },
                {
                  id: "m17-l13",
                  title: "Iglaste",
                  desc: "Iglaste (Pinophyta) i ich ewolucja.",
                  duration: 13
                },
                {
                  id: "m17-l14",
                  title: "Okrytonasienne",
                  desc: "Okrytonasienne (Angiospermae) — ewolucja roślin kwiatowych.",
                  duration: 14
                },
                {
                  id: "m17-l15",
                  title: "Drewno kopalne",
                  desc: "Kopalne drewno i jego anatomia — dendrologia paleobotaniczna.",
                  duration: 15
                },
                {
                  id: "m17-l16",
                  title: "Liście",
                  desc: "Kopalne liście i ich znaczenie taksonomiczne i klimatyczne.",
                  duration: 8
                },
                {
                  id: "m17-l17",
                  title: "Nasiona",
                  desc: "Kopalne nasiona i ich rola w rekonstrukcji flory.",
                  duration: 9
                },
                {
                  id: "m17-l18",
                  title: "Pyłek i spory",
                  desc: "Pyłek i spory — palinologia jako narzędzie stratygraficzne i ekologiczne.",
                  duration: 10
                },
                {
                  id: "m17-l19",
                  title: "Paleoklimaty na podstawie roślin",
                  desc: "Rekonstrukcja paleoklimatów z kopalnej flory — analiza kształtu liści.",
                  duration: 11
                }
            ]
          },
          {
            id: "m18",
            title: "Mikropaleontologia",
            lessons: [
                {
                  id: "m18-l1",
                  title: "Foraminifera",
                  desc: "Otwornice (Foraminifera) — budowa, ekologia i znaczenie biostratygraficzne.",
                  duration: 9
                },
                {
                  id: "m18-l2",
                  title: "Radiolaria",
                  desc: "Promienice (Radiolaria) — budowa i znaczenie dla rekonstrukcji środowisk morskich.",
                  duration: 10
                },
                {
                  id: "m18-l3",
                  title: "Diatoms",
                  desc: "Okrzemki (diatoms) — budowa i rola w rekonstrukcji paleośrodowisk.",
                  duration: 11
                },
                {
                  id: "m18-l4",
                  title: "Ostracods",
                  desc: "Małżoraczki (ostracods) — mikroskamieniałości o dużej wartości ekologicznej.",
                  duration: 12
                },
                {
                  id: "m18-l5",
                  title: "Conodonts",
                  desc: "Konodonty (conodonts) — ważne skamieniałości przewodnie paleozoiku.",
                  duration: 13
                },
                {
                  id: "m18-l6",
                  title: "Calcareous nannofossils",
                  desc: "Wapienne nanoskamieniałości i ich znaczenie biostratygraficzne.",
                  duration: 14
                },
                {
                  id: "m18-l7",
                  title: "Pollen",
                  desc: "Pyłek kopalny jako narzędzie palinologii i rekonstrukcji roślinności.",
                  duration: 15
                },
                {
                  id: "m18-l8",
                  title: "Spores",
                  desc: "Spory kopalne i ich znaczenie stratygraficzne.",
                  duration: 8
                }
            ]
          },
          {
            id: "m19",
            title: "Ichnologia",
            lessons: [
                {
                  id: "m19-l1",
                  title: "Tropy",
                  desc: "Ślady stóp (tropy) i ich interpretacja behawioralna.",
                  duration: 9
                },
                {
                  id: "m19-l2",
                  title: "Trackways",
                  desc: "Ścieżki śladów (trackways) i rekonstrukcja lokomocji.",
                  duration: 10
                },
                {
                  id: "m19-l3",
                  title: "Burrows",
                  desc: "Nory (burrows) jako ślady aktywności organizmów w osadzie.",
                  duration: 11
                },
                {
                  id: "m19-l4",
                  title: "Borings",
                  desc: "Wiercenia (borings) w twardym podłożu i ich znaczenie.",
                  duration: 12
                },
                {
                  id: "m19-l5",
                  title: "Coprolites",
                  desc: "Skamieniałe odchody (coprolites) i informacje o diecie.",
                  duration: 13
                },
                {
                  id: "m19-l6",
                  title: "Gastroliths — kryteria identyfikacji",
                  desc: "Kamienie żołądkowe (gastroliths) i kryteria ich rozpoznawania.",
                  duration: 14
                },
                {
                  id: "m19-l7",
                  title: "Ślady żerowania",
                  desc: "Ślady żerowania na roślinach i innych organizmach.",
                  duration: 15
                },
                {
                  id: "m19-l8",
                  title: "Gniazda",
                  desc: "Kopalne gniazda i ich interpretacja behawioralna.",
                  duration: 8
                },
                {
                  id: "m19-l9",
                  title: "Jaja",
                  desc: "Kopalne jaja i ich znaczenie dla rozrodu dinozaurów.",
                  duration: 9
                },
                {
                  id: "m19-l10",
                  title: "Ślady ugryzień",
                  desc: "Ślady ugryzień na kościach i ich interpretacja paleoekologiczna.",
                  duration: 10
                }
            ]
,
            practice: {
              title: "Analiza trackway",
              desc: "Uczeń dostaje trackway i oblicza stride length, pace i track width, a następnie próbuje określić sposób lokomocji zwierzęcia."
            }
          }
      ]
    },
    {
      id: "etap-5",
      title: "Systematyka i analiza ewolucyjna",
      hours: "około 45 godzin",
      modules: [
          {
            id: "m20",
            title: "Taksonomia i nomenklatura",
            lessons: [
                {
                  id: "m20-l1",
                  title: "ICZN — zasady ogólne",
                  desc: "International Code of Zoological Nomenclature — podstawowy kodeks nomenklatury zwierząt.",
                  duration: 9
                },
                {
                  id: "m20-l2",
                  title: "Species (gatunek)",
                  desc: "Kategoria gatunku i jej znaczenie w systematyce.",
                  duration: 10
                },
                {
                  id: "m20-l3",
                  title: "Genus (rodzaj)",
                  desc: "Kategoria rodzaju i zasady jej tworzenia.",
                  duration: 11
                },
                {
                  id: "m20-l4",
                  title: "Family (rodzina)",
                  desc: "Kategoria rodziny w hierarchii taksonomicznej.",
                  duration: 12
                },
                {
                  id: "m20-l5",
                  title: "Order (rząd)",
                  desc: "Kategoria rzędu i wyższe rangi taksonomiczne.",
                  duration: 13
                },
                {
                  id: "m20-l6",
                  title: "Clade (klad)",
                  desc: "Pojęcie kladu w systematyce filogenetycznej.",
                  duration: 14
                },
                {
                  id: "m20-l7",
                  title: "Holotype",
                  desc: "Holotyp — podstawowy okaz typowy gatunku.",
                  duration: 15
                },
                {
                  id: "m20-l8",
                  title: "Paratype",
                  desc: "Paratypy — dodatkowe okazy typowe.",
                  duration: 8
                },
                {
                  id: "m20-l9",
                  title: "Syntype",
                  desc: "Syntypy — seria okazów typowych przy braku holotypu.",
                  duration: 9
                },
                {
                  id: "m20-l10",
                  title: "Lectotype",
                  desc: "Lektotyp — wyznaczony z syntypów jako nomenklatoryczny punkt odniesienia.",
                  duration: 10
                },
                {
                  id: "m20-l11",
                  title: "Neotype",
                  desc: "Neotyp — nowo wyznaczony typ po utracie oryginału.",
                  duration: 11
                },
                {
                  id: "m20-l12",
                  title: "Type species",
                  desc: "Gatunek typowy rodzaju — punkt odniesienia dla nazwy rodzaju.",
                  duration: 12
                },
                {
                  id: "m20-l13",
                  title: "Type locality",
                  desc: "Miejsce typowe (type locality) — lokalizacja oryginalnego znaleziska okazu typowego.",
                  duration: 13
                },
                {
                  id: "m20-l14",
                  title: "ICN — Madrid Code",
                  desc: "International Code of Nomenclature dla glonów, grzybów i roślin — Madrid Code (2025).",
                  duration: 14
                }
            ]
          },
          {
            id: "m21",
            title: "Filogenetyka",
            lessons: [
                {
                  id: "m21-l1",
                  title: "Tree of life",
                  desc: "Drzewo życia — koncepcja i reprezentacja pokrewieństw.",
                  duration: 9
                },
                {
                  id: "m21-l2",
                  title: "Clade",
                  desc: "Klad — grupa monofiletyczna organizmów.",
                  duration: 10
                },
                {
                  id: "m21-l3",
                  title: "Node",
                  desc: "Węzeł (node) na drzewie filogenetycznym — punkt rozgałęzienia.",
                  duration: 11
                },
                {
                  id: "m21-l4",
                  title: "Sister taxon",
                  desc: "Takson siostrzany — najbliższy krewny na drzewie.",
                  duration: 12
                },
                {
                  id: "m21-l5",
                  title: "Stem lineage",
                  desc: "Linia łodygowa (stem lineage) — pomiędzy korzeniem a koroną.",
                  duration: 13
                },
                {
                  id: "m21-l6",
                  title: "Crown group",
                  desc: "Grupa koronna (crown group) — zawiera ostatniego wspólnego przodka i wszystkie potomki.",
                  duration: 14
                },
                {
                  id: "m21-l7",
                  title: "Outgroup",
                  desc: "Grupa zewnętrzna (outgroup) — punkt odniesienia do polaryzacji cech.",
                  duration: 15
                },
                {
                  id: "m21-l8",
                  title: "Character",
                  desc: "Cecha (character) w analizie filogenetycznej.",
                  duration: 8
                },
                {
                  id: "m21-l9",
                  title: "Character state",
                  desc: "Stan cechy (character state) i jego kodowanie.",
                  duration: 9
                },
                {
                  id: "m21-l10",
                  title: "Primitive vs derived",
                  desc: "Cechy pierwotne (plesiomorficzne) vs pochodne (apomorficzne).",
                  duration: 10
                },
                {
                  id: "m21-l11",
                  title: "Plesiomorphy",
                  desc: "Plezjomorfia — cecha ancestralna wspólna dla szerszej grupy.",
                  duration: 11
                },
                {
                  id: "m21-l12",
                  title: "Apomorphy",
                  desc: "Apomorfia — cecha pochodna charakterystyczna dla grupy.",
                  duration: 12
                },
                {
                  id: "m21-l13",
                  title: "Synapomorphy",
                  desc: "Synapomorfia — wspólna pochodna cecha definiująca klad.",
                  duration: 13
                },
                {
                  id: "m21-l14",
                  title: "Autapomorphy",
                  desc: "Autapomorfia — unikalna cecha pojedynczego taksonu.",
                  duration: 14
                },
                {
                  id: "m21-l15",
                  title: "Homoplasy",
                  desc: "Homoplazja — podobieństwo cech nie wynikające z wspólnego pochodzenia.",
                  duration: 15
                },
                {
                  id: "m21-l16",
                  title: "Character matrix",
                  desc: "Macierz cech (character matrix) — podstawowe narzędzie analizy filogenetycznej.",
                  duration: 8
                },
                {
                  id: "m21-l17",
                  title: "Parsimony",
                  desc: "Zasada parsymonii — wybór najprostszego drzewa.",
                  duration: 9
                },
                {
                  id: "m21-l18",
                  title: "Consensus trees",
                  desc: "Drzewa konsensusowe i reprezentacja wielu równie dobrych hipotez.",
                  duration: 10
                },
                {
                  id: "m21-l19",
                  title: "Support values",
                  desc: "Wartości wsparcia (bootstrap, Bremer) i ich interpretacja.",
                  duration: 11
                },
                {
                  id: "m21-l20",
                  title: "Wprowadzenie do likelihood",
                  desc: "Metoda maksymalnej wiarygodności (likelihood) w filogenetyce.",
                  duration: 12
                },
                {
                  id: "m21-l21",
                  title: "Wprowadzenie do metod bayesowskich",
                  desc: "Metody bayesowskie w rekonstrukcji filogenezy.",
                  duration: 13
                },
                {
                  id: "m21-l22",
                  title: "Total evidence",
                  desc: "Analiza total evidence — łączenie różnych typów danych.",
                  duration: 14
                },
                {
                  id: "m21-l23",
                  title: "Molecular data + morphology",
                  desc: "Łączenie danych molekularnych i morfologicznych w analizie filogenetycznej.",
                  duration: 15
                }
            ]
          },
          {
            id: "m22",
            title: "Makroewolucja",
            lessons: [
                {
                  id: "m22-l1",
                  title: "Diversification",
                  desc: "Dywersyfikacja — wzrost różnorodności w czasie geologicznym.",
                  duration: 9
                },
                {
                  id: "m22-l2",
                  title: "Origination",
                  desc: "Powstawanie nowych taksonów i tempo origination.",
                  duration: 10
                },
                {
                  id: "m22-l3",
                  title: "Extinction",
                  desc: "Wymieranie jako proces makroewolucyjny.",
                  duration: 11
                },
                {
                  id: "m22-l4",
                  title: "Radiations",
                  desc: "Radiacje ewolucyjne i ich wzorce w zapisie kopalnym.",
                  duration: 12
                },
                {
                  id: "m22-l5",
                  title: "Adaptive radiation",
                  desc: "Radiacja adaptacyjna w nowe nisze ekologiczne.",
                  duration: 13
                },
                {
                  id: "m22-l6",
                  title: "Morphological disparity",
                  desc: "Rozpiętość morfologiczna (disparity) vs różnorodność taksonomiczna.",
                  duration: 14
                },
                {
                  id: "m22-l7",
                  title: "Diversity",
                  desc: "Różnorodność (diversity) i jej pomiar w czasie geologicznym.",
                  duration: 15
                },
                {
                  id: "m22-l8",
                  title: "Evolutionary rates",
                  desc: "Tempo ewolucji i zmiany w różnych liniach.",
                  duration: 8
                },
                {
                  id: "m22-l9",
                  title: "Evolutionary constraints",
                  desc: "Ograniczenia ewolucyjne — fizyczne, rozwojowe i historyczne.",
                  duration: 9
                },
                {
                  id: "m22-l10",
                  title: "Convergence",
                  desc: "Konwergencja w skali makroewolucyjnej.",
                  duration: 10
                },
                {
                  id: "m22-l11",
                  title: "Mass extinction recovery",
                  desc: "Odbudowa różnorodności po masowych wymieraniach.",
                  duration: 11
                },
                {
                  id: "m22-l12",
                  title: "Sampling bias",
                  desc: "Obciążenie próbkowania w danych makroewolucyjnych.",
                  duration: 12
                },
                {
                  id: "m22-l13",
                  title: "Signor–Lipps effect",
                  desc: "Efekt Signor–Lipps — pozorne stopniowe wymieranie przed granicą.",
                  duration: 13
                },
                {
                  id: "m22-l14",
                  title: "Ghost lineages",
                  desc: "Linie widmowe (ghost lineages) — domniemane linie bez zapisu kopalnego.",
                  duration: 14
                }
            ]
          },
          {
            id: "m23",
            title: "Functional morphology i biomechanika",
            lessons: [
                {
                  id: "m23-l1",
                  title: "Forma a funkcja",
                  desc: "Związek między formą a funkcją w anatomii funkcjonalnej.",
                  duration: 9
                },
                {
                  id: "m23-l2",
                  title: "Allometria",
                  desc: "Allometria — zmiana proporcji ze wzrostem wielkości ciała.",
                  duration: 10
                },
                {
                  id: "m23-l3",
                  title: "Center of mass",
                  desc: "Środek masy ciała i jego rekonstrukcja u kopalnych kręgowców.",
                  duration: 11
                },
                {
                  id: "m23-l4",
                  title: "Leverage",
                  desc: "Dźwignie biomechaniczne w układzie szkieletowo-mięśniowym.",
                  duration: 12
                },
                {
                  id: "m23-l5",
                  title: "Moment arm",
                  desc: "Ramię momentu siły i jego wpływ na biomechanikę.",
                  duration: 13
                },
                {
                  id: "m23-l6",
                  title: "Szczęki",
                  desc: "Biomechanika szczęk i mechanika ich działania.",
                  duration: 14
                },
                {
                  id: "m23-l7",
                  title: "Siła zgryzu",
                  desc: "Szacowanie siły zgryzu u kopalnych drapieżników.",
                  duration: 15
                },
                {
                  id: "m23-l8",
                  title: "Lokomocja",
                  desc: "Rodzaje lokomocji i ich rekonstrukcja z anatomii.",
                  duration: 8
                },
                {
                  id: "m23-l9",
                  title: "Postawa",
                  desc: "Postawa ciała i jej ewolucja u kręgowców.",
                  duration: 9
                },
                {
                  id: "m23-l10",
                  title: "Bipedalizm",
                  desc: "Dwunożność (bipedalizm) — ewolucja i biomechanika.",
                  duration: 10
                },
                {
                  id: "m23-l11",
                  title: "Quadrupedalizm",
                  desc: "Czworononożność (quadrupedalizm) i jej adaptacje.",
                  duration: 11
                },
                {
                  id: "m23-l12",
                  title: "Mechanika lotu",
                  desc: "Biomechanika lotu u pterozaurów i ptaków.",
                  duration: 12
                },
                {
                  id: "m23-l13",
                  title: "Pływanie",
                  desc: "Adaptacje do pływania u kopalnych kręgowców wodnych.",
                  duration: 13
                },
                {
                  id: "m23-l14",
                  title: "Biomechanika kości",
                  desc: "Właściwości mechaniczne kości i ich interpretacja.",
                  duration: 14
                },
                {
                  id: "m23-l15",
                  title: "Finite element analysis",
                  desc: "Metoda elementów skończonych (FEA) — idea i interpretacja wyników.",
                  duration: 15
                },
                {
                  id: "m23-l16",
                  title: "Ograniczenia rekonstrukcji",
                  desc: "Ograniczenia i niepewności w rekonstrukcjach biomechanicznych.",
                  duration: 8
                }
            ]
          }
      ]
    },
    {
      id: "etap-6",
      title: "Prawdziwa praca paleontologa",
      hours: "około 55–60 godzin",
      modules: [
          {
            id: "m24",
            title: "Poszukiwanie stanowisk",
            lessons: [
                {
                  id: "m24-l1",
                  title: "Mapy geologiczne",
                  desc: "Czytanie map geologicznych i identyfikacja potencjalnych stanowisk.",
                  duration: 9
                },
                {
                  id: "m24-l2",
                  title: "Topografia",
                  desc: "Wykorzystanie topografii terenu w poszukiwaniu stanowisk paleontologicznych.",
                  duration: 10
                },
                {
                  id: "m24-l3",
                  title: "Wychodnie",
                  desc: "Identyfikacja wychodni warstw skalnych jako miejsc eksponujących skamieniałości.",
                  duration: 11
                },
                {
                  id: "m24-l4",
                  title: "GPS",
                  desc: "Używanie GPS do precyzyjnej lokalizacji stanowisk.",
                  duration: 12
                },
                {
                  id: "m24-l5",
                  title: "GIS",
                  desc: "Systemy informacji geograficznej (GIS) w paleontologii terenowej.",
                  duration: 13
                },
                {
                  id: "m24-l6",
                  title: "Fotografie satelitarne",
                  desc: "Wykorzystanie zdjęć satelitarnych do identyfikacji stanowisk.",
                  duration: 14
                },
                {
                  id: "m24-l7",
                  title: "Dokumentacja lokalizacji",
                  desc: "Standardy dokumentacji lokalizacji stanowiska w terenie.",
                  duration: 15
                },
                {
                  id: "m24-l8",
                  title: "Locality number",
                  desc: "Przypisywanie numeru lokalizacji (locality number) stanowisku.",
                  duration: 8
                },
                {
                  id: "m24-l9",
                  title: "Prospecting",
                  desc: "Techniki prospekcji terenowej — przeszukiwanie powierzchni.",
                  duration: 9
                },
                {
                  id: "m24-l10",
                  title: "Surface collection",
                  desc: "Zbiór powierzchniowy (surface collection) i jego metodologia.",
                  duration: 10
                }
            ]
          },
          {
            id: "m25",
            title: "Wykopaliska paleontologiczne",
            lessons: [
                {
                  id: "m25-l1",
                  title: "Fossil discovery",
                  desc: "Odkrycie skamieniałości w terenie — pierwsza ocena sytuacji. Nigdy nie wyrywamy okazu.",
                  duration: 9
                },
                {
                  id: "m25-l2",
                  title: "Ocena okazu",
                  desc: "Ocena widocznych elementów, rodzaju skały i stabilności okazu.",
                  duration: 10
                },
                {
                  id: "m25-l3",
                  title: "Dokumentacja w terenie",
                  desc: "Dokumentacja: GPS, fotografie, skala, orientacja, stratygrafia, sedimentologia, locality number.",
                  duration: 11
                },
                {
                  id: "m25-l4",
                  title: "Mapowanie układu kości",
                  desc: "Mapowanie przestrzennego układu kości i okazów w stanowisku.",
                  duration: 12
                },
                {
                  id: "m25-l5",
                  title: "Excavation",
                  desc: "Odsłanianie powierzchni — usuwanie nadkładu i ekspozycja okazu.",
                  duration: 13
                },
                {
                  id: "m25-l6",
                  title: "Stabilizacja okazu",
                  desc: "Stabilizacja okazu — wyłącznie przez odpowiednio przeszkoloną osobę.",
                  duration: 14
                },
                {
                  id: "m25-l7",
                  title: "Pedestal",
                  desc: "Pedestal — podważanie i przygotowanie okazu do kapsuły.",
                  duration: 15
                },
                {
                  id: "m25-l8",
                  title: "Jacket",
                  desc: "Kapsułkowanie (jacket) — zabezpieczenie okazu gipsową powłoką.",
                  duration: 8
                },
                {
                  id: "m25-l9",
                  title: "Transport",
                  desc: "Bezpieczny transport kapsuły z okazem do laboratorium.",
                  duration: 9
                },
                {
                  id: "m25-l10",
                  title: "Field notes",
                  desc: "Notatki terenowe (field notes) — kompletna dokumentacja wykopalisk.",
                  duration: 10
                }
            ]
          },
          {
            id: "m26",
            title: "Preparacja skamieniałości",
            lessons: [
                {
                  id: "m26-l1",
                  title: "Preparation assessment",
                  desc: "Ocena preparacji — analiza okazu przed rozpoczęciem prac.",
                  duration: 9
                },
                {
                  id: "m26-l2",
                  title: "Matrix vs fossil",
                  desc: "Rozróżnianie matriksu od kości i materiału kopalnego.",
                  duration: 10
                },
                {
                  id: "m26-l3",
                  title: "Mechanical preparation",
                  desc: "Mechaniczna preparacja — narzędzia i techniki.",
                  duration: 11
                },
                {
                  id: "m26-l4",
                  title: "Pneumatic tools",
                  desc: "Narzędzia pneumatyczne do preparacji skamieniałości.",
                  duration: 12
                },
                {
                  id: "m26-l5",
                  title: "Needles",
                  desc: "Preparacja igłowa — precyzyjne usuwanie matriksu.",
                  duration: 13
                },
                {
                  id: "m26-l6",
                  title: "Microscopes",
                  desc: "Praca pod mikroskopem w preparacji mikroskamieniałości.",
                  duration: 14
                },
                {
                  id: "m26-l7",
                  title: "Consolidants",
                  desc: "Konsolidanty — stabilizacja kruchej powierzchni okazu.",
                  duration: 15
                },
                {
                  id: "m26-l8",
                  title: "Adhesives",
                  desc: "Kleje i adhezywa używane w preparacji.",
                  duration: 8
                },
                {
                  id: "m26-l9",
                  title: "Reversibility",
                  desc: "Zasada odwracalności zabiegów preparacyjnych.",
                  duration: 9
                },
                {
                  id: "m26-l10",
                  title: "Solvents",
                  desc: "Rozpuszczalniki i ich bezpieczne stosowanie.",
                  duration: 10
                },
                {
                  id: "m26-l11",
                  title: "Molding",
                  desc: "Wykonywanie form (molding) do odlewów.",
                  duration: 11
                },
                {
                  id: "m26-l12",
                  title: "Casting",
                  desc: "Odlewanie (casting) kopii okazu.",
                  duration: 12
                },
                {
                  id: "m26-l13",
                  title: "Micropreparation",
                  desc: "Mikro-preparacja — praca z drobnymi elementami pod powiększeniem.",
                  duration: 13
                },
                {
                  id: "m26-l14",
                  title: "Acid preparation — teoria i ryzyko",
                  desc: "Preparacja kwasowa — zasada, zastosowania i ryzyko uszkodzenia okazu.",
                  duration: 14
                },
                {
                  id: "m26-l15",
                  title: "Pyrite decay",
                  desc: "Rozkład pirytu (pyrite decay) — zagrożenie i zapobieganie.",
                  duration: 15
                },
                {
                  id: "m26-l16",
                  title: "Archival materials",
                  desc: "Materiały archiwalne — trwałe i nietoksyczne substancje konserwacyjne.",
                  duration: 8
                },
                {
                  id: "m26-l17",
                  title: "Documentation",
                  desc: "Dokumentacja procesu preparacji i użytych materiałów.",
                  duration: 9
                },
                {
                  id: "m26-l18",
                  title: "BHP",
                  desc: "Bezpieczeństwo i higiena pracy w preparacji.",
                  duration: 10
                },
                {
                  id: "m26-l19",
                  title: "PPE",
                  desc: "Środki ochrony osobistej (PPE) w pracy preparatorskiej.",
                  duration: 11
                },
                {
                  id: "m26-l20",
                  title: "Kiedy nie preparować",
                  desc: "Kiedy powstrzymać się od preparacji — ochrona cennych okazów.",
                  duration: 12
                }
            ]
          },
          {
            id: "m27",
            title: "Kolekcje muzealne",
            lessons: [
                {
                  id: "m27-l1",
                  title: "Acquisition",
                  desc: "Akcesja (acquisition) — pozyskiwanie okazów do kolekcji.",
                  duration: 9
                },
                {
                  id: "m27-l2",
                  title: "Accession",
                  desc: "Rejestracja akcesyjna (accession) i nadanie numeru.",
                  duration: 10
                },
                {
                  id: "m27-l3",
                  title: "Cataloguing",
                  desc: "Katalogowanie (cataloguing) okazów w systemie muzealnym.",
                  duration: 11
                },
                {
                  id: "m27-l4",
                  title: "Specimen number",
                  desc: "Numer okazu (specimen number) — unikalny identyfikator.",
                  duration: 12
                },
                {
                  id: "m27-l5",
                  title: "Label",
                  desc: "Etykieta (label) okazu i jej wymagane dane.",
                  duration: 13
                },
                {
                  id: "m27-l6",
                  title: "Locality data",
                  desc: "Dane lokalizacyjne (locality data) powiązane z okazem.",
                  duration: 14
                },
                {
                  id: "m27-l7",
                  title: "Type collection",
                  desc: "Kolekcja typów (type collection) — szczególna opieka nad okazami typowymi.",
                  duration: 15
                },
                {
                  id: "m27-l8",
                  title: "Storage",
                  desc: "Przechowywanie (storage) i warunki magazynowania okazów.",
                  duration: 8
                },
                {
                  id: "m27-l9",
                  title: "Loan",
                  desc: "Wypożyczanie (loan) okazów między instytucjami.",
                  duration: 9
                },
                {
                  id: "m27-l10",
                  title: "Destructive sampling",
                  desc: "Pobieranie próbek niszczących (destructive sampling) i jego zasady.",
                  duration: 10
                },
                {
                  id: "m27-l11",
                  title: "Digitisation",
                  desc: "Cyfryzacja (digitisation) kolekcji i bazy danych.",
                  duration: 11
                }
            ]
,
            practice: {
              title: "Gra edukacyjna — karta okazu",
              desc: "Uczeń dostaje okaz DINO-2026-00451 i musi stworzyć profesjonalną kartę: Taxon, Element, Locality, Formation, Stratigraphic position, Collector, Collection date, Preparation history, Condition, Storage location, References."
            }
          },
          {
            id: "m28",
            title: "Digital Paleontology",
            lessons: [
                {
                  id: "m28-l1",
                  title: "Fotografia naukowa",
                  desc: "Techniki fotografii naukowej okazu kopalnego.",
                  duration: 9
                },
                {
                  id: "m28-l2",
                  title: "Skala fotograficzna",
                  desc: "Stosowanie skali fotograficznej i standardy dokumentacji wizualnej.",
                  duration: 10
                },
                {
                  id: "m28-l3",
                  title: "Photogrammetry",
                  desc: "Fotogrametria — rekonstrukcja 3D z serii zdjęć.",
                  duration: 11
                },
                {
                  id: "m28-l4",
                  title: "Meshes",
                  desc: "Siatki trójkątów (meshes) w modelowaniu 3D.",
                  duration: 12
                },
                {
                  id: "m28-l5",
                  title: "Point clouds",
                  desc: "Chmury punktów (point clouds) i ich przetwarzanie.",
                  duration: 13
                },
                {
                  id: "m28-l6",
                  title: "CT",
                  desc: "Tomografia komputerowa (CT) — nieniszcząca analiza wewnętrznej struktury.",
                  duration: 14
                },
                {
                  id: "m28-l7",
                  title: "Micro-CT",
                  desc: "Mikro-CT — wysokiej rozdzielczości obrazowanie małych obiektów.",
                  duration: 15
                },
                {
                  id: "m28-l8",
                  title: "Voxel",
                  desc: "Woksele (voxel) — elementy objętościowe w obrazowaniu 3D.",
                  duration: 8
                },
                {
                  id: "m28-l9",
                  title: "Segmentation",
                  desc: "Segmentacja danych tomograficznych — oddzielanie struktury od tła.",
                  duration: 9
                },
                {
                  id: "m28-l10",
                  title: "Digital restoration",
                  desc: "Cyfrowa rekonstrukcja (digital restoration) uszkodzonych okazów.",
                  duration: 10
                },
                {
                  id: "m28-l11",
                  title: "3D landmarks",
                  desc: "Punkty orientacyjne 3D (landmarks) w analizie kształtu.",
                  duration: 11
                },
                {
                  id: "m28-l12",
                  title: "Geometric morphometrics",
                  desc: "Geometromorfometria — ilościowa analiza kształtu.",
                  duration: 12
                },
                {
                  id: "m28-l13",
                  title: "GIS w paleontologii",
                  desc: "Zastosowanie GIS w analizie przestrzennej danych paleontologicznych.",
                  duration: 13
                },
                {
                  id: "m28-l14",
                  title: "Specimen databases",
                  desc: "Bazy danych okazów i ich zarządzanie.",
                  duration: 14
                },
                {
                  id: "m28-l15",
                  title: "Reproducibility",
                  desc: "Powtarzalność (reproducibility) analiz cyfrowych i danych.",
                  duration: 15
                },
                {
                  id: "m28-l16",
                  title: "Metadata",
                  desc: "Metadane — standardy opisu danych cyfrowych.",
                  duration: 8
                }
            ]
          },
          {
            id: "m29",
            title: "Paleontologia danych",
            lessons: [
                {
                  id: "m29-l1",
                  title: "Paleobiology Database",
                  desc: "Paleobiology Database — publiczne, międzynarodowe źródło danych o zapisie kopalnym.",
                  duration: 9
                },
                {
                  id: "m29-l2",
                  title: "Occurrence data",
                  desc: "Dane o wystąpieniach (occurrence data) i ich struktura.",
                  duration: 10
                },
                {
                  id: "m29-l3",
                  title: "Projekt 1: Zmiana liczby rodzajów w czasie",
                  desc: "Analiza zmian liczby znanych rodzajów w czasie geologicznym.",
                  duration: 11
                },
                {
                  id: "m29-l4",
                  title: "Projekt 2: Rozmieszczenie Tyrannosauridae",
                  desc: "Wizualizacja rozmieszczenia wystąpień tyranozaurów.",
                  duration: 12
                },
                {
                  id: "m29-l5",
                  title: "Projekt 3: Diversity przed i po K–Pg",
                  desc: "Porównanie różnorodności przed i po wymieraniu K–Pg.",
                  duration: 13
                },
                {
                  id: "m29-l6",
                  title: "Liczba rekordów vs rzeczywista liczebność",
                  desc: "Kluczowy problem — liczba rekordów nie równa się rzeczywistej liczebności biologicznej.",
                  duration: 14
                },
                {
                  id: "m29-l7",
                  title: "Sampling",
                  desc: "Konieczność uwzględniania próbkowania w analizach różnorodności.",
                  duration: 15
                }
            ]
          },
          {
            id: "m30",
            title: "Literatura naukowa",
            lessons: [
                {
                  id: "m30-l1",
                  title: "Abstract",
                  desc: "Streszczenie (abstract) — cel i główne wnioski publikacji.",
                  duration: 9
                },
                {
                  id: "m30-l2",
                  title: "Introduction",
                  desc: "Wstęp (introduction) — kontekst i pytanie badawcze.",
                  duration: 10
                },
                {
                  id: "m30-l3",
                  title: "Materials",
                  desc: "Materiały (materials) — opis badanych okazów.",
                  duration: 11
                },
                {
                  id: "m30-l4",
                  title: "Methods",
                  desc: "Metody (methods) — opis zastosowanych technik badawczych.",
                  duration: 12
                },
                {
                  id: "m30-l5",
                  title: "Results",
                  desc: "Wyniki (results) — przedstawienie danych i obserwacji.",
                  duration: 13
                },
                {
                  id: "m30-l6",
                  title: "Discussion",
                  desc: "Dyskusja (discussion) — interpretacja wyników w szerszym kontekście.",
                  duration: 14
                },
                {
                  id: "m30-l7",
                  title: "Conclusions",
                  desc: "Wnioski (conclusions) — podsumowanie ustaleń.",
                  duration: 15
                },
                {
                  id: "m30-l8",
                  title: "References",
                  desc: "Bibliografia (references) — źródła cytowane w pracy.",
                  duration: 8
                },
                {
                  id: "m30-l9",
                  title: "Supplementary information",
                  desc: "Materiały uzupełniające (supplementary information) — dodatkowe dane.",
                  duration: 9
                },
                {
                  id: "m30-l10",
                  title: "DOI",
                  desc: "Digital Object Identifier (DOI) — trwały identyfikator publikacji.",
                  duration: 10
                },
                {
                  id: "m30-l11",
                  title: "Peer review",
                  desc: "Recenzja naukowa (peer review) — proces oceny przed publikacją.",
                  duration: 11
                },
                {
                  id: "m30-l12",
                  title: "Primary source",
                  desc: "Źródło pierwotne (primary source) — oryginalna publikacja badawcza.",
                  duration: 12
                },
                {
                  id: "m30-l13",
                  title: "Review paper",
                  desc: "Praca przeglądowa (review paper) — synteza dotychczasowych badań.",
                  duration: 13
                },
                {
                  id: "m30-l14",
                  title: "Monograph",
                  desc: "Monografia — obszerna praca poświęcona jednemu tematowi.",
                  duration: 14
                },
                {
                  id: "m30-l15",
                  title: "Supplementary dataset",
                  desc: "Zbiór danych uzupełniających publikację.",
                  duration: 15
                },
                {
                  id: "m30-l16",
                  title: "Preprint",
                  desc: "Preprint — wersja robocza przed recenzją naukową.",
                  duration: 8
                }
            ]
,
            practice: {
              title: "Krytyczna kompetencja — weryfikacja źródeł",
              desc: "Uczeń dostaje trzy informacje na ten sam temat: Wikipedię, artykuł prasowy i oryginalny paper. Musi odnaleźć, co faktycznie twierdzą autorzy badania."
            }
          },
          {
            id: "m31",
            title: "Jak opisuje się skamieniałość",
            lessons: [
                {
                  id: "m31-l1",
                  title: "Provenance",
                  desc: "Pochodzenie (provenance) — dokumentacja lokalizacji i kontekstu okazu.",
                  duration: 9
                },
                {
                  id: "m31-l2",
                  title: "Geology",
                  desc: "Kontekst geologiczny stanowiska i opis warstwy.",
                  duration: 10
                },
                {
                  id: "m31-l3",
                  title: "Material",
                  desc: "Opis materiału (material) — zachowane elementy i ich stan.",
                  duration: 11
                },
                {
                  id: "m31-l4",
                  title: "Methods",
                  desc: "Metody (methods) zastosowane w opisie okazu.",
                  duration: 12
                },
                {
                  id: "m31-l5",
                  title: "Anatomy",
                  desc: "Opis anatomii (anatomy) — szczegółowy opis morfologii okazu.",
                  duration: 13
                },
                {
                  id: "m31-l6",
                  title: "Comparison",
                  desc: "Porównanie (comparison) z innymi taksonami.",
                  duration: 14
                },
                {
                  id: "m31-l7",
                  title: "Phylogenetic analysis",
                  desc: "Analiza filogenetyczna (phylogenetic analysis) pozycji okazu.",
                  duration: 15
                },
                {
                  id: "m31-l8",
                  title: "Interpretation",
                  desc: "Interpretacja (interpretation) — wnioski systematyczne i taksonomiczne.",
                  duration: 8
                }
            ]
          },
          {
            id: "m32",
            title: "Etyka i prawo",
            lessons: [
                {
                  id: "m32-l1",
                  title: "Prawo własności",
                  desc: "Kwestie prawa własności do skamieniałości — zależne od jurysdykcji.",
                  duration: 9
                },
                {
                  id: "m32-l2",
                  title: "Pozwolenia",
                  desc: "Wymagane pozwolenia na zbieranie i wykopaliska.",
                  duration: 10
                },
                {
                  id: "m32-l3",
                  title: "Protected sites",
                  desc: "Stanowiska chronione — ograniczenia i restrykcje.",
                  duration: 11
                },
                {
                  id: "m32-l4",
                  title: "Provenance",
                  desc: "Etyczna dokumentacja pochodzenia okazu.",
                  duration: 12
                },
                {
                  id: "m32-l5",
                  title: "Handel skamieniałościami",
                  desc: "Handel skamieniałościami i jego zagrożenia dla nauki.",
                  duration: 13
                },
                {
                  id: "m32-l6",
                  title: "Nielegalny eksport",
                  desc: "Nielegalny eksport skamieniałości i przemyt.",
                  duration: 14
                },
                {
                  id: "m32-l7",
                  title: "Repozytoria",
                  desc: "Repozytoria — trwałe instytucje przechowujące okazy.",
                  duration: 15
                },
                {
                  id: "m32-l8",
                  title: "Scientific access",
                  desc: "Dostęp naukowy do materiału kopalnego w kolekcjach.",
                  duration: 8
                },
                {
                  id: "m32-l9",
                  title: "Preparacja — etyka",
                  desc: "Etyczne aspekty preparacji okazów.",
                  duration: 9
                },
                {
                  id: "m32-l10",
                  title: "Destructive sampling — etyka",
                  desc: "Etyczne zasady pobierania próbek niszczących.",
                  duration: 10
                },
                {
                  id: "m32-l11",
                  title: "Falsyfikowanie danych",
                  desc: "Falsyfikowanie danych naukowych jako naruszenie etyki.",
                  duration: 11
                },
                {
                  id: "m32-l12",
                  title: "Fabrication",
                  desc: "Fabrykowanie (fabrication) wyników badań.",
                  duration: 12
                },
                {
                  id: "m32-l13",
                  title: "Plagiarism",
                  desc: "Plagiat — naruszenie zasad integralności naukowej.",
                  duration: 13
                },
                {
                  id: "m32-l14",
                  title: "Konflikty interesów",
                  desc: "Konflikty interesów w badaniach paleontologicznych.",
                  duration: 14
                }
            ]
          }
      ]
    },
    {
      id: "etap-7",
      title: "Paleontolog jako badacz",
      hours: "około 30 godzin",
      modules: [
          {
            id: "m33",
            title: "Projektowanie badania",
            lessons: [
                {
                  id: "m33-l1",
                  title: "Obserwacja",
                  desc: "Obserwacja jako punkt wyjścia procesu badawczego.",
                  duration: 9
                },
                {
                  id: "m33-l2",
                  title: "Problem",
                  desc: "Formułowanie problemu badawczego na podstawie obserwacji.",
                  duration: 10
                },
                {
                  id: "m33-l3",
                  title: "Pytanie badawcze",
                  desc: "Definiowanie pytania badawczego, na które można odpowiedzieć.",
                  duration: 11
                },
                {
                  id: "m33-l4",
                  title: "Hipoteza",
                  desc: "Formułowanie testowalnej hipotezy.",
                  duration: 12
                },
                {
                  id: "m33-l5",
                  title: "Predykcja",
                  desc: "Wyprowadzanie przewidywań z hipotezy.",
                  duration: 13
                },
                {
                  id: "m33-l6",
                  title: "Metoda",
                  desc: "Dobór metody badawczej odpowiedniej do pytania.",
                  duration: 14
                },
                {
                  id: "m33-l7",
                  title: "Dane",
                  desc: "Zbieranie danych zgodnie z zaplanowaną metodą.",
                  duration: 15
                },
                {
                  id: "m33-l8",
                  title: "Analiza",
                  desc: "Analiza zebranych danych i ich interpretacja statystyczna.",
                  duration: 8
                },
                {
                  id: "m33-l9",
                  title: "Wyniki",
                  desc: "Prezentacja wyników analizy.",
                  duration: 9
                },
                {
                  id: "m33-l10",
                  title: "Interpretacja",
                  desc: "Interpretacja wyników w kontekście pytania badawczego.",
                  duration: 10
                },
                {
                  id: "m33-l11",
                  title: "Wnioski",
                  desc: "Formułowanie wniosków i ich ograniczeń.",
                  duration: 11
                }
            ]
          }
      ]
    }
  ],
  certification: {
    title: "Paleontologist Certification Program",
    formalName: "Certyfikat Zaawansowanych Podstaw Paleontologii",
    altName: "Certyfikat Paleontologii Stosowanej",
    disclaimer: "Certificate confirms successful completion of the educational programme and does not constitute a professional licence or academic degree.",
    requirements: [
      { element: "Wszystkie lekcje", requirement: "100% ukończenia" },
      { element: "Quizy lekcyjne", requirement: "≥80%" },
      { element: "Egzaminy modułowe", requirement: "≥75%" },
      { element: "Zadania praktyczne", requirement: "≥75%" },
      { element: "Geologia/stratygrafia", requirement: "obowiązkowe" },
      { element: "Anatomia", requirement: "obowiązkowe" },
      { element: "Tafonomia", requirement: "obowiązkowe" },
      { element: "Ethics & provenance", requirement: "100%" },
      { element: "Final practical case", requirement: "≥75%" },
      { element: "Final exam", requirement: "≥80%" },
      { element: "Capstone report", requirement: "zaliczony" }
    ],
    levels: [
      {
        id: "level-1",
        name: "Level I — Fossil Explorer",
        desc: "Geologia + podstawy ewolucji + fossilization."
      },
      {
        id: "level-2",
        name: "Level II — Paleontology Student",
        desc: "Stratygrafia + anatomia + historia życia + grupy kopalne."
      },
      {
        id: "level-3",
        name: "Level III — Paleontology Analyst",
        desc: "Tafonomia + filogenetyka + paleoecologia + analiza danych."
      },
      {
        id: "level-4",
        name: "Level IV — Paleontology Professional Foundations",
        desc: "Fieldwork + collections + preparation theory + research + capstone. Dopiero ten poziom daje główny certyfikat."
      }
    ],
    capstone: {
      title: "FINAL CAPSTONE — The Paleontologist Case",
      desc: "Uczeń dostaje fikcyjne, ale naukowo realistyczne stanowisko (np. Formacja X, późna kreda). Otrzymuje: mapę, profil stratygraficzny, zdjęcia skał, fotografie fragmentów szkieletu, położenie kości, dane sedymentologiczne, mikroskamieniałości, kilka pomiarów, zdjęcie zęba i literaturę porównawczą. Musi przejść pełny workflow paleontologa.",
      tasks: [
        {
          id: "cap-1",
          title: "Geological context",
          desc: "Określić środowisko depozycyjne stanowiska."
        },
        {
          id: "cap-2",
          title: "Stratigraphy",
          desc: "Umieścić stanowisko w profilu stratygraficznym."
        },
        {
          id: "cap-3",
          title: "Taphonomy",
          desc: "Ocenić articulation, transport, weathering i orientation szczątków."
        },
        {
          id: "cap-4",
          title: "Anatomy",
          desc: "Zidentyfikować elementy szkieletu."
        },
        {
          id: "cap-5",
          title: "Taxonomy",
          desc: "Określić możliwie najniższy uzasadniony poziom identyfikacji. Czasem poprawną odpowiedzią jest Theropoda indet."
        },
        {
          id: "cap-6",
          title: "Phylogenetics",
          desc: "Uzupełnienie małej macierzy cech i analiza filogenetyczna."
        },
        {
          id: "cap-7",
          title: "Collection record",
          desc: "Stworzenie profesjonalnej karty okazu."
        },
        {
          id: "cap-8",
          title: "Research report",
          desc: "Mini-paper (1500–2500 słów) z sekcjami: Introduction, Geological setting, Material, Methods, Results, Discussion, Conclusion."
        }
      ]
    }
  }
};