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
};// course-dino-1.js
// Moduły 1–12 kursu „Wszystko o dinozaurach”.
(function () {
  window.COURSE_DINO = window.COURSE_DINO || { id: 'dino-all', modules: [] };
  var M = window.COURSE_DINO.modules;

  function shortDesc(txt) {
    var plain = String(txt).replace(/<[^>]+>/g, '');
    var cut = plain.split(/(?<=\.)\s/)[0] || plain;
    if (cut.length > 165) cut = cut.slice(0, 162).replace(/\s+\S*$/, '') + '…';
    return cut;
  }

  function lesson(id, title, desc, focus, evidence, figure) {
    var body = [
      '<p><strong>' + title + '</strong> ' + focus + '</p>',
      '<p>W paleontologii najważniejsze jest oddzielenie obserwacji od interpretacji: skamieniałość dostarcza danych, a wniosek o biologii zwierzęcia musi być sprawdzalny. Pojedyncza cecha rzadko rozstrzyga sprawę; większą wartość ma jej zestaw oraz kontekst geologiczny.</p>',
      '<h3>Jak odczytujemy dowody</h3>',
      '<p>' + evidence + ' Badacze porównują zachowane elementy z innymi okazami, dokumentują ich położenie w warstwie i sprawdzają alternatywne wyjaśnienia. Pozwala to ograniczyć wpływ przypadku, niekompletności materiału oraz wcześniejszych założeń.</p>',
      '<ul><li><strong>Opis:</strong> co dokładnie zachowało się w skale lub w szkielecie.</li><li><strong>Porównanie:</strong> z jakimi okazami i grupami można to zestawić.</li><li><strong>Wniosek:</strong> która interpretacja najlepiej pasuje do całego zbioru danych.</li></ul>',
      '<blockquote>W nauce pewność wynika z jakości i zgodności dowodów, a nie z atrakcyjności rekonstrukcji.</blockquote>',
      '<p>Warto też pamiętać o skali czasu. Znane okazy są próbką dawnych populacji, a zapis kopalny jest niepełny. Dlatego rzetelna odpowiedź może brzmieć „prawdopodobnie” albo „nie mamy jeszcze pewności”. Taka ostrożność nie osłabia wiedzy, lecz pokazuje, gdzie kończą się dane. Każdą rekonstrukcję traktuj jako aktualny model, który może zmienić się wraz z kolejnym odkryciem oraz lepszą analizą.</p>'
    ];
    var out = { id: id, title: title, desc: desc, duration: 9, body: body };
    if (figure) out.figure = { caption: 'Rekonstrukcja pomocnicza: ' + title + '.', alt: 'Ilustracja wyjaśniająca temat lekcji: ' + title + '.' };
    return out;
  }

  function module(num, title, summary, figures, items, quiz) {
    var lessons = [], questions = [], i;
    for (i = 0; i < items.length; i += 1) {
      lessons.push(lesson('d' + num + '-l' + (i + 1), items[i][0], shortDesc(items[i][1]), items[i][1], items[i][2], i % 2 === 0));
    }
    for (i = 0; i < quiz.length; i += 1) {
      questions.push({ q: quiz[i][0], options: quiz[i][1], answer: quiz[i][2], why: quiz[i][3] });
    }
    return { id: 'd' + num, num: num, title: title, summary: summary, figures: figures, lessons: lessons, quiz: questions };
  }

  M.push(module(1, "Wprowadzenie do świata dinozaurów", "Poznasz naukową definicję dinozaurów, ich miejsce wśród kręgowców i sposoby rozpoznawania popularnych nieporozumień.", [{"id": "d1-f1", "caption": "Przegląd kluczowych zagadnień modułu: Wprowadzenie do świata dinozaurów.", "alt": "Schemat omawiający temat modułu 1: Wprowadzenie do świata dinozaurów."}, {"id": "d1-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 1.", "alt": "Ilustracja wspierająca naukę w module 1."}], [["Czym właściwie jest dinozaur?", "Dinozaury są określoną gałęzią archozaurów, rozpoznawaną po wspólnym pochodzeniu, a nie po samym dużym rozmiarze czy wymarciu. Współczesne ptaki należą do tej gałęzi.", "Definicja opiera się na pokrewieństwie i cechach szkieletu, między innymi otwartym <strong>acetabulum</strong>, czyli panewce biodrowej, oraz pionowym ustawieniu kończyn."], ["Co jest dinozaurem, a co nim nie jest?", "Nie każdy mezozoiczny gad był dinozaurem. Pterozaury były bliskimi krewnymi dinozaurów, a mozazaury należały do łuskonośnych gadów morskich.", "Najpierw ustala się pozycję na drzewie ewolucyjnym, a dopiero potem używa nazwy grupy; środowisko życia nie wystarcza do klasyfikacji."], ["Najważniejsze cechy dinozaurów", "U podstaw dinozaurów leży zestaw cech kostnych związanych z miednicą i kończyną tylną, a nie jedna „magiczna” cecha widoczna z daleka.", "Cechy są oceniane łącznie, bo niektóre z nich mogły pojawiać się niezależnie u innych zwierząt albo nie zachować się w okazie."], ["Jak klasyfikujemy dinozaury?", "Współczesna klasyfikacja odtwarza pokrewieństwo. Badacze porównują wiele cech skamieniałości i testują, które rozgałęzienia drzewa wymagają najmniej zmian.", "Nazwy grup są użyteczne, lecz hipotezy pokrewieństwa mogą się zmieniać po odkryciu lepszego materiału lub ponownej analizie cech."], ["Najczęstsze mity o dinozaurach", "Dinozaury nie były jednolitą grupą gigantycznych łuskowatych potworów. Obejmowały formy małe i duże, roślinożerne i mięsożerne, a wiele miało pióra lub struktury pióropodobne.", "Popkultura bywa dobrym początkiem zainteresowania, ale rekonstrukcję należy sprawdzać względem skamieniałości, śladów skóry i aktualnych badań."]], [["Co obejmuje współczesna definicja dinozaurów?", ["Wszystkie wielkie gady mezozoiku", "Gałąź określoną wspólnym pochodzeniem", "Wyłącznie wymarłe zwierzęta lądowe", "Tylko zwierzęta z łuskami"], 1, "Dinozaury definiuje się jako gałąź pokrewieństwa, nie przez rozmiar ani wymarcie."], ["Które zwierzę jest dinozaurem?", ["Mozazaur", "Pterozaur", "Współczesny ptak", "Dimetrodon"], 2, "Ptaki są żyjącą linią dinozaurów teropodów."], ["Czego nie wystarcza użyć do klasyfikacji?", ["Zestawu cech i pokrewieństwa", "Kontekstu geologicznego", "Samego środowiska życia", "Analizy szkieletu"], 2, "Życie w tym samym środowisku nie określa pokrewieństwa."], ["Dlaczego pojedyncza cecha rzadko rozstrzyga klasyfikację?", ["Bo kości nie są przydatne", "Może występować niezależnie lub nie zachować się", "Dinozaury nie miały cech szkieletu", "Gatunki nie różnią się cechami"], 1, "Cechy ocenia się w zestawie, ponieważ pojedyncze mogą być mylące."], ["Co jest właściwym podejściem do mitu popkulturowego?", ["Traktowanie go jako dowodu", "Sprawdzenie go względem aktualnych danych", "Pomijanie skamieniałości", "Wybór najciekawszej wersji"], 1, "Rekonstrukcje należy konfrontować z dowodami naukowymi."]]));
  M.push(module(2, "Narodziny dinozaurów", "Prześledzisz pochodzenie dinozaurów w triasie oraz warunki, które sprzyjały ich późniejszemu zróżnicowaniu.", [{"id": "d2-f1", "caption": "Przegląd kluczowych zagadnień modułu: Narodziny dinozaurów.", "alt": "Schemat omawiający temat modułu 2: Narodziny dinozaurów."}, {"id": "d2-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 2.", "alt": "Ilustracja wspierająca naukę w module 2."}], [["Świat przed pojawieniem się dinozaurów", "Po wymieraniu permskim ekosystemy lądowe odbudowywały się długo. W triasie żyło wiele grup kręgowców, w tym synapsydy, krokodylomorfy i rozmaite archozauromorfy.", "Pojawienie się dinozaurów nie oznaczało natychmiastowej dominacji; przez znaczną część triasu były one jedną z wielu grup."], ["Archozaury i przodkowie dinozaurów", "Dinozaury wywodzą się z gałęzi archozaurów, do której należą także krokodyle, pterozaury i liczne wymarłe linie. Ich bliżsi krewni są nazywani dinozauromorfami.", "Pokrewieństwo odczytuje się z kombinacji cech czaszki, kręgów, miednicy i kończyn, nie z podobieństwa do współczesnego gada."], ["Pierwsze dinozaury", "Najstarsze dobrze udokumentowane dinozaury pochodzą ze środkowego i późnego triasu Ameryki Południowej oraz Afryki. Były na ogół niewielkie i dwunożne.", "Daty najwcześniejszych form zależą od wieku warstw i identyfikacji fragmentarycznych szczątków, dlatego granice pozostają przedmiotem badań."], ["Dlaczego dinozaury odniosły ewolucyjny sukces?", "Nie ma jednej potwierdzonej przyczyny sukcesu dinozaurów. Sprzyjać mogły sprawniejsza lokomocja, szybki wzrost, elastyczna ekologia i zmiany po kryzysie końca triasu.", "Sukces ewolucyjny oznacza przetrwanie i różnicowanie linii, a nie obowiązkowo przewagę każdego gatunku w każdym środowisku."], ["Jak dinozaury opanowały świat?", "Po wymieraniu na granicy triasu i jury wiele konkurencyjnych linii archozaurów zniknęło. Dinozaury rozszerzyły zasięg geograficzny i zajęły liczne nisze lądowe.", "Rozprzestrzenianie nie było jednorazowym podbojem: różne grupy pojawiały się, wymierały i ponownie różnicowały na zmieniających się kontynentach."]], [["Z jakiej większej grupy wywodzą się dinozaury?", ["Synapsydów", "Archozaurów", "Łuskonośnych", "Płazów"], 1, "Dinozaury należą do archozaurów."], ["Czy pierwsze dinozaury od razu dominowały w triasie?", ["Tak, wszędzie", "Nie, długo były jedną z wielu grup", "Tak, ale tylko w morzach", "Nie istniały w triasie"], 1, "Ich dominacja nie była natychmiastowa."], ["Co oznacza sukces ewolucyjny w tym kontekście?", ["Obowiązkową przewagę każdego gatunku", "Przetrwanie i różnicowanie linii", "Największy rozmiar", "Życie wyłącznie w stadach"], 1, "Sukces dotyczy trwałości i zróżnicowania linii."], ["Co prawdopodobnie sprzyjało ekspansji dinozaurów po końcu triasu?", ["Zniknięcie części konkurencyjnych linii", "Pojawienie się ludzi", "Zamarznięcie oceanów", "Brak roślin"], 0, "Wymieranie otworzyło nisze po zniknięciu części konkurentów."], ["Jak należy traktować datę najstarszych dinozaurów?", ["Jako niezmienną ciekawostkę", "W zależności od datowania warstw i materiału", "Jako dokładną do dnia", "Bez związku z warstwami"], 1, "Wiek i identyfikacja znalezisk wpływają na ocenę najstarszych form."]]));
  M.push(module(3, "Trias – początki ery dinozaurów", "Zobaczysz, jak wyglądała planeta, na której pojawiły się pierwsze dinozaury, oraz dlaczego koniec triasu zmienił skład fauny.", [{"id": "d3-f1", "caption": "Przegląd kluczowych zagadnień modułu: Trias – początki ery dinozaurów.", "alt": "Schemat omawiający temat modułu 3: Trias – początki ery dinozaurów."}, {"id": "d3-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 3.", "alt": "Ilustracja wspierająca naukę w module 3."}], [["Jak wyglądała Ziemia w triasie?", "Trias trwał od około 252 do 201 milionów lat temu. Lądy były w dużej mierze połączone w superkontynent Pangeę, a życie odbudowywało się po wielkim wymieraniu permskim.", "Rekonstrukcje triasu łączą dane z warstw skalnych, skamieniałości, paleomagnetyzmu i modeli klimatu, więc obraz jest stale doprecyzowywany."], ["Klimat i kontynenty", "Wnętrze Pangei było często suche i sezonowe, lecz warunki nie były wszędzie jednakowe. Istniały strefy wilgotniejsze, rzeki, jeziora i obszary przybrzeżne.", "Nie należy przedstawiać triasu jako jednej niezmiennej pustyni; klimat zmieniał się w czasie i zależał od szerokości geograficznej."], ["Pierwsze znane dinozaury", "W późnym triasie żyły między innymi <em>Eoraptor</em>, <em>Herrerasaurus</em> i <em>Saturnalia</em>. Ich dokładne pozycje ewolucyjne pomagają odtworzyć wczesne rozgałęzienia dinozaurów.", "Fragmentaryczny materiał bywa trudny do przypisania, dlatego nazwa „najstarszy dinozaur” powinna zawsze uwzględniać jakość dowodów."], ["Inne zwierzęta żyjące obok nich", "Triasowe ekosystemy zamieszkiwały także fitozaury, aetozaury, rauizuchy, wczesne krokodylomorfy i ssakokształtne cynodonty. W powietrzu pojawiły się pterozaury.", "Współwystępowanie skamieniałości nie dowodzi bezpośredniej interakcji; trzeba brać pod uwagę wiek warstwy i środowisko osadzania."], ["Wymieranie pod koniec triasu", "Około 201 milionów lat temu nastąpiło masowe wymieranie związane prawdopodobnie z intensywnym wulkanizmem Central Atlantic Magmatic Province i szybkimi zmianami klimatu.", "Mechanizmy kryzysu są badane z wykorzystaniem geochemii oraz datowań; nie każda grupa zniknęła w tej samej chwili i z tej samej przyczyny."]], [["Jaki superkontynent dominował w triasie?", ["Gondwana", "Pangea", "Laurazja", "Atlantyda"], 1, "W triasie większość lądów tworzyła Pangeę."], ["Czy klimat triasu był identyczny na całej planecie?", ["Tak", "Nie, różnił się regionalnie i w czasie", "Tylko na wybrzeżach", "Nie ma żadnych danych"], 1, "Warunki zależały między innymi od szerokości geograficznej i odległości od morza."], ["Co jest przykładem triasowego dinozaura?", ["Herrerasaurus", "Tyrannosaurus rex", "Mamut", "Mosazaur"], 0, "Herrerasaurus żył w późnym triasie."], ["Co żyło obok wczesnych dinozaurów?", ["Wyłącznie ssaki", "Fitozaury i aetozaury", "Wieloryby", "Pingwiny"], 1, "Triasowe ekosystemy obejmowały wiele innych archozaurów."], ["Z czym wiąże się wymieranie końca triasu?", ["Z intensywnym wulkanizmem i zmianami klimatu", "Z udomowieniem dinozaurów", "Z powstaniem Księżyca", "Z lodowcem na całej Ziemi"], 0, "Jedną z głównych hipotez jest wpływ wulkanizmu CAMP."]]));
  M.push(module(4, "Jura – czas gigantów", "Poznasz jurajskie środowiska, różnorodność dinozaurów oraz pochodzenie ptaków w obrębie teropodów.", [{"id": "d4-f1", "caption": "Przegląd kluczowych zagadnień modułu: Jura – czas gigantów.", "alt": "Schemat omawiający temat modułu 4: Jura – czas gigantów."}, {"id": "d4-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 4.", "alt": "Ilustracja wspierająca naukę w module 4."}], [["Ziemia i klimat jury", "Jura trwała od około 201 do 145 milionów lat temu. Pangea zaczęła się rozpadać, a rozległe niziny i łagodniejsze regiony wspierały zróżnicowane ekosystemy.", "Globalne uśrednienia klimatu nie opisują wszystkich lokalnych warunków; osady pokazują różnice sezonowości i wilgotności."], ["Rozkwit dinozaurów", "W jurze wyraźnie zróżnicowały się zauropody, teropody i liczne roślinożerne grupy. Zmiany w budowie ciała pozwoliły im wykorzystywać odmienne zasoby i sposoby poruszania.", "Duża liczba gatunków w zapisie kopalnym zależy także od tego, gdzie zachowały się skały i gdzie prowadzono badania."], ["Gigantyczne zauropody", "Zauropody, takie jak <em>Diplodocus</em> i <em>Brachiosaurus</em>, łączyły olbrzymie rozmiary z długą szyją, pneumatyzacją kości i wydajnym układem oddechowym.", "Masa, postawa i tempo wzrostu są szacowane modelami opartymi na kościach, dlatego wyniki podaje się jako zakresy, a nie pojedynczą pewną liczbę."], ["Wielkie drapieżniki", "Duże teropody, na przykład <em>Allosaurus</em>, były ważnymi konsumentami w wielu jurajskich ekosystemach. Ich zęby i czaszki wskazują na pobieranie mięsa, lecz strategia polowania nie zawsze jest znana.", "Sama wielkość zębów nie dowodzi, czy zwierzę polowało samotnie, grupowo czy często korzystało z padliny."], ["Pierwsze ptaki", "Ptaki są żyjącymi dinozaurami teropodami. Jurajski <em>Archaeopteryx</em> miał pióra lotne, ale zachowywał również wiele cech niewspółczesnych teropodów, jak zęby i długi ogon kostny.", "Nie jest to „brakujące ogniwo”, lecz jedna z wielu form dokumentujących mozaikową ewolucję cech ptasich."], ["Najważniejsze jurajskie ekosystemy", "Znane stanowiska, takie jak Morrison w Ameryce Północnej, Tendaguru w Tanzanii i Solnhofen w Niemczech, zachowały odmienne zestawy organizmów i środowisk.", "Porównując stanowiska, należy odróżniać różnice biologiczne od różnic w sposobie zachowania oraz intensywności badań."]], [["Co działo się z Pangeą w jurze?", ["Dopiero powstawała", "Zaczęła się rozpadać", "Całkiem zniknęła", "Nie istniała"], 1, "W jurze następował rozpad Pangei."], ["Która cecha pomagała odciążyć szyję zauropodów?", ["Pneumatyzacja kości", "Pancerz", "Brak kręgów", "Skrzela"], 0, "Pneumatyzacja zmniejszała masę kości."], ["Do jakiej grupy należą współczesne ptaki?", ["Pterozaurów", "Teropodów", "Mozazaurów", "Synapsydów"], 1, "Ptaki są teropodowymi dinozaurami."], ["Czego nie dowodzą same duże zęby teropoda?", ["Kontaktu z kością", "Dokładnej strategii polowania", "Że zwierzę jadło mięso", "Że miał czaszkę"], 1, "Same zęby nie rozstrzygają zachowania łowieckiego."], ["Dlaczego porównuje się różne stanowiska jurajskie ostrożnie?", ["Mają identyczne osady", "Różni je zachowanie i intensywność badań", "Nie zawierają skamieniałości", "Są wszystkie z jednego dnia"], 1, "Różnice w zapisie kopalnym mogą zniekształcać obraz fauny."]]));
  M.push(module(5, "Kreda – złoty wiek dinozaurów", "Dowiesz się, dlaczego kreda przyniosła wielką różnorodność dinozaurów oraz jak wyglądały jej ostatnie miliony lat.", [{"id": "d5-f1", "caption": "Przegląd kluczowych zagadnień modułu: Kreda – złoty wiek dinozaurów.", "alt": "Schemat omawiający temat modułu 5: Kreda – złoty wiek dinozaurów."}, {"id": "d5-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 5.", "alt": "Ilustracja wspierająca naukę w module 5."}], [["Świat kredy", "Kreda trwała od około 145 do 66 milionów lat temu. Kontynenty były bardziej rozdzielone niż w jurze, poziom mórz często wysoki, a rośliny okrytonasienne rozszerzały zasięg.", "Kreda nie była wszędzie jednakowo ciepła; zapis osadów i izotopów pokazuje różne klimaty regionalne."], ["Największa różnorodność dinozaurów", "W kredzie rosła różnorodność teropodów, hadrozaurów, ceratopsów, ankylozaurów i tytanozaurów. Różne kontynenty rozwijały własne zespoły fauny.", "Liczba nazwanych gatunków nie jest prostym pomiarem dawnej różnorodności, bo rekord kopalny jest nierównomierny."], ["Tyranozaury", "Tyranozaury przeszły drogę od niewielkich form do wielkich drapieżników, takich jak <em>Tyrannosaurus rex</em>. Czaszka i zęby późnych tyranozaurów były przystosowane do zadawania silnych ugryzień.", "Dowody wskazują na aktywne zdobywanie pokarmu i padlinożerstwo jako możliwe zachowania, bez potrzeby przeciwstawiania tych strategii."], ["Ceratopsy", "Ceratopsy miały charakterystyczne dzioby, kryzy i rogi, lecz ich funkcje były zróżnicowane. Część struktur mogła służyć rozpoznawaniu, pokazom lub obronie.", "Nie każda ozdoba musi mieć jedną funkcję; interpretację sprawdza się na budowie, wzroście i zmienności osobniczej."], ["Hadrozaury", "Hadrozaury były roślinożercami z rozbudowanymi bateriami zębowymi, w których kolejne zęby zastępowały zużyte. Niektóre miały grzebienie nosowe o zróżnicowanej budowie.", "Grzebienie nie są automatycznie dowodem na określony dźwięk lub płeć; wymagają osobnego testowania."], ["Ankylozaury", "Ankylozaury wyróżniały się osteodermami, czyli kostnymi elementami skóry, oraz u części form buławą ogonową. Ich pancerz mógł chronić, ale był też częścią biologii rozwoju.", "Układ osteodermów rekonstruuje się z zachowanych okazów, a rozproszone kości skóry mogą zostać przesunięte po śmierci."], ["Dinozaury pierzaste", "Pióra występowały u wielu teropodów, a ich wczesne formy mogły przypominać proste filamenty. U różnych linii pełniły funkcje izolacji, sygnalizacji i lotu.", "Brak odcisku piór nie dowodzi braku piór, ponieważ miękkie tkanki zachowują się tylko w szczególnych warunkach."], ["Ostatnie miliony lat przed wymieraniem", "Przed granicą kreda–paleogen dinozaury nielotne nadal tworzyły zróżnicowane zespoły. Około 66 milionów lat temu uderzenie planetoidy Chicxulub wywołało globalny kryzys.", "Dyskusja dotyczy szczegółów regionalnych zmian, nie zaś samego faktu masowego wymierania na granicy K–Pg."]], [["Kiedy zakończyła się kreda?", ["Około 66 mln lat temu", "Około 10 tys. lat temu", "Około 252 mln lat temu", "W średniowieczu"], 0, "Granica K–Pg ma wiek około 66 milionów lat."], ["Co charakteryzowało baterie zębowe hadrozaurów?", ["Brak wymiany zębów", "Wiele współpracujących zębów do ścierania", "Zęby tylko w dziobie", "Zęby bez korzeni"], 1, "Baterie zębowe tworzyły powierzchnie ścierające."], ["Czym są osteodermy ankylozaurów?", ["Elementami skóry o budowie kostnej", "Piórami lotnymi", "Zębami", "Kamieniami w żołądku"], 0, "Osteodermy były kostnymi elementami skóry."], ["Które stwierdzenie o piórach jest poprawne?", ["Występowały wyłącznie u ptaków", "Mogły służyć izolacji i sygnalizacji", "Zawsze umożliwiały lot", "Nie zachowują się w skamieniałościach"], 1, "Pióra miały różne funkcje także przed lotem."], ["Jakie zdarzenie silnie wiąże się z wymieraniem K–Pg?", ["Uderzenie Chicxulub", "Powstanie Pangei", "Pojawienie się pierwszych ryb", "Wymieranie permskie"], 0, "Uderzenie planetoidy Chicxulub było kluczowym czynnikiem kryzysu."]]));
  M.push(module(6, "Drzewo genealogiczne dinozaurów", "Nauczysz się czytać hipotezy pokrewieństwa i rozpoznawać główne linie dinozaurów.", [{"id": "d6-f1", "caption": "Przegląd kluczowych zagadnień modułu: Drzewo genealogiczne dinozaurów.", "alt": "Schemat omawiający temat modułu 6: Drzewo genealogiczne dinozaurów."}, {"id": "d6-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 6.", "alt": "Ilustracja wspierająca naukę w module 6."}], [["Jak czytać drzewo ewolucyjne?", "Drzewo ewolucyjne przedstawia hipotezę wspólnego pochodzenia. Węzeł oznacza wspólnego przodka, a nie konkretną znaną skamieniałość ani obowiązkowo moment powstania cechy.", "Kolejność nazw na końcach gałęzi nie wyznacza stopnia „zaawansowania”; liczą się połączenia między gałęziami."], ["Saurischia i Ornithischia", "Tradycyjnie dinozaury dzielono na Saurischia i Ornithischia według budowy miednicy. Współczesne analizy dyskutują szczegóły wczesnych relacji, dlatego układ jest aktywnie badany.", "Nazwa „ptasiomiedniczne” nie oznacza, że ptaki pochodzą od ornitiszów; ptaki są teropodami."], ["Teropody", "Teropody to bardzo zróżnicowana linia, obejmująca mięsożerne formy, roślinożerne terizinozaury, wszystkożerne owiraptorozaury oraz ptaki. Dwunożność jest ważna, ale nie opisuje całej ich ekologii.", "Kategoria teropodów opiera się na pochodzeniu, więc dieta pojedynczego gatunku nie może go z niej wykluczyć."], ["Zauropodomorfy", "Zauropodomorfy obejmują zauropody i ich bliższych krewnych. Wiele linii rozwinęło długie szyje, małe głowy i roślinożerność, ale rozmiary ciała były bardzo różne.", "Wczesne formy nie były po prostu „niedokończonymi zauropodami”; miały własne adaptacje i historię."], ["Ornithopody", "Ornithopody były roślinożernymi dinozaurami o różnych rozmiarach i sposobach żerowania. Do tej grupy zalicza się między innymi iguanodonty i hadrozaury.", "Nie należy utożsamiać całej grupy z jednym gatunkiem ani zakładać identycznego trybu życia wszystkich jej przedstawicieli."], ["Ceratopsy", "Ceratopsy tworzą linię roślinożerców, od niewielkich form dwunożnych po duże czworonożne ceratopsydy z rogami i kryzami.", "Rozmiar rogów może zależeć od wieku i zmienności osobniczej, dlatego pojedynczy okaz rzadko rozstrzyga o gatunku."], ["Pachycefalozaury", "Pachycefalozaury były roślinożercami lub wszystkożercami z pogrubionymi kośćmi sklepienia czaszki. Ich domniemane zachowania społeczne pozostają trudne do testowania.", "Uszkodzenia czaszek mogą mieć wiele przyczyn, więc nie są automatycznym dowodem na zderzanie głowami."], ["Stegozaury", "Stegozaury miały podwójne szeregi płyt kostnych oraz kolce ogonowe. Płyty były unaczynione i prawdopodobnie pełniły kilka funkcji, w tym sygnalizację.", "Dokładny układ płyt ustala się najlepiej na okazach zachowanych w połączeniu anatomicznym."], ["Ankylozaury", "Ankylozaury rozwinęły pancerz z osteodermów i u części linii buławę ogonową. Były blisko spokrewnione ze stegozaurami w obrębie tyreoforów.", "Podobna obecność pancerza u innych zwierząt nie oznacza bliskiego pokrewieństwa, ponieważ pancerz może ewoluować zbieżnie."], ["Pokrewieństwo między poszczególnymi grupami", "Relacje między grupami wynikają z analizy wielu cech, a nie z jednego podobieństwa. Nowe skamieniałości mogą wypełniać luki i zmieniać ocenę dawnych hipotez.", "Stabilna nazwa grupy nie gwarantuje, że jej dokładne miejsce na drzewie pozostanie niezmienne."]], [["Co oznacza węzeł na drzewie ewolucyjnym?", ["Największy gatunek", "Wspólnego przodka gałęzi", "Dokładną skamieniałość", "Kolejność wymierania"], 1, "Węzeł przedstawia hipotezę wspólnego przodka."], ["Czy kolejność nazw na końcach drzewa oznacza stopień rozwoju?", ["Tak", "Nie, liczą się połączenia gałęzi", "Tylko dla ptaków", "Tylko dla zauropodów"], 1, "Układ końcówek można obracać bez zmiany topologii."], ["Skąd pochodzą ptaki?", ["Od ornitiszów", "Od teropodów", "Od mozazaurów", "Od pterozaurów"], 1, "Ptaki należą do teropodów."], ["Która grupa obejmuje iguanodonty i hadrozaury?", ["Ornithopody", "Tyranozaury", "Zauropody", "Pterozaury"], 0, "Iguanodonty i hadrozaury są ornithopodami."], ["Dlaczego hipotezy pokrewieństwa mogą się zmieniać?", ["Ponieważ nazwy są losowe", "Nowe okazy i analizy dostarczają danych", "Kości przestają istnieć", "Drzewa nie używają cech"], 1, "Nowe dane mogą zmienić najlepiej uzasadnione rozgałęzienie."]]));
  M.push(module(7, "Teropody – drapieżcy i nie tylko", "Poznasz różnorodność teropodów, od wielkich drapieżników po dziwaczne roślinożerne i ptaki.", [{"id": "d7-f1", "caption": "Przegląd kluczowych zagadnień modułu: Teropody – drapieżcy i nie tylko.", "alt": "Schemat omawiający temat modułu 7: Teropody – drapieżcy i nie tylko."}, {"id": "d7-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 7.", "alt": "Ilustracja wspierająca naukę w module 7."}], [["Budowa teropodów", "Typowy teropod poruszał się na dwóch nogach, a jego kończyny przednie były bardzo zróżnicowane. Budowa miednicy, stopy, ogona i kręgów pomaga odtwarzać równowagę ciała.", "Nie wszystkie teropody miały identyczne proporcje lub dietę; „teropod” jest nazwą pokrewieństwa, nie gotowym opisem stylu życia."], ["Ewolucja teropodów", "Teropody powstały w triasie i rozdzieliły się na liczne linie. Wśród nich pojawiły się formy drapieżne, roślinożerne, wszystkożerne i latające ptaki.", "Zmiana diety nie wymaga opuszczenia grupy: potomkowie zachowują historię pochodzenia niezależnie od późniejszej ekologii."], ["Tyranozaury", "Tyranozaury miały silne czaszki, zęby o grubym przekroju i rozwinięte zmysły. Wczesne gatunki były mniejsze, a gigantyzm pojawił się dopiero w niektórych późnych liniach.", "Ślady ugryzień dowodzą kontaktu z kością, ale same nie pozwalają bezpośrednio rozstrzygnąć wszystkich zachowań łowieckich."], ["Allozaury", "Allozaury były dużymi jurajskimi teropodami o stosunkowo lekkiej czaszce i zębach z ząbkowanymi krawędziami. <em>Allosaurus</em> jest dobrze znany z formacji Morrison.", "Modele biomechaniczne sugerują możliwe sposoby użycia czaszki, ale nie są nagraniem rzeczywistego zachowania."], ["Spinozaury", "Spinozaury miały wydłużone pyski i stożkowate zęby, co wskazuje na częste wykorzystywanie zasobów wodnych. Ich ogon i proporcje kończyn są przedmiotem debat o sposobie pływania.", "Niepewność rekonstrukcji wynika częściowo z niekompletności okazów i z różnic między gatunkami."], ["Abelizaury", "Abelizaury, takie jak <em>Carnotaurus</em>, były ważnymi drapieżnikami południowych kontynentów. Często miały krótkie kończyny przednie i ozdobne struktury czaszki.", "Redukcja kończyn przednich nie wyjaśnia całej biologii zwierzęcia; funkcję ocenia się w zestawieniu z resztą ciała."], ["Dromeozaury", "Dromeozaury miały powiększony drugi pazur stopy i wiele cech wspólnych z ptakami. Liczne formy były pierzaste, a ich rozmiary obejmowały znacznie więcej niż popularne wyobrażenie „raptora”.", "Nie ma podstaw, by wszystkie dromeozaury przedstawiać jako zwierzęta polujące w zorganizowanych watahach."], ["Owiraptorozaury", "Owiraptorozaury tworzą zróżnicowaną grupę maniraptorów, często z dziobem i piórami. Okazy znalezione na gniazdach wskazują na opiekę nad jajami u niektórych form.", "Nazwa grupy pochodzi z dawnej interpretacji i nie jest dowodem, że jej przedstawiciele wyspecjalizowali się w kradzieży jaj."], ["Ornitomimozaury", "Ornitomimozaury miały długie nogi, małe głowy i u wielu gatunków bezzębne dzioby. Ich dieta mogła być zróżnicowana, od wszystkożerności po wybiórcze odżywianie roślinne.", "Smukła sylwetka nie wystarcza do obliczenia prędkości; potrzebne są dane o mięśniach, stawach i śladach."], ["Terizinozaury", "Terizinozaury były teropodami o dużych pazurach, wydłużonych szyjach i cechach związanych z roślinożernością. Pokazują, że historia teropodów nie ogranicza się do drapieżnictwa.", "Olbrzymi pazur może służyć różnym celom, takim jak zdobywanie pokarmu, obrona czy sygnalizacja, a nie tylko atak."], ["Najdziwniejsze teropody", "Nietypowe teropody, jak <em>Yi qi</em> z błoniastą powierzchnią lotną czy <em>Deinocheirus</em> z ogromnymi kończynami, przypominają o różnorodności ewolucyjnych rozwiązań.", "To, co wydaje się dziwne, zależy od porównania z ograniczoną liczbą zachowanych okazów, a nie od biologicznej „normalności”."]], [["Czy wszystkie teropody były mięsożerne?", ["Tak", "Nie, były też roślinożerne i wszystkożerne", "Tylko ptaki", "Tylko najstarsze"], 1, "Wśród teropodów były różne strategie odżywiania."], ["Co charakteryzowało spinozaury?", ["Wydłużone pyski i zęby związane z zasobami wodnymi", "Brak czaszki", "Pancerz jak u ankylozaurów", "Wyłącznie roślinna dieta"], 0, "Anatomia spinozaurów wskazuje na częste wykorzystywanie zasobów wodnych."], ["Która grupa ma powiększony drugi pazur stopy?", ["Dromeozaury", "Ceratopsy", "Hadrozaury", "Stegozaury"], 0, "Dromeozaury wyróżniały się powiększonym drugim pazurem."], ["Co wskazują okazy owiraptorozaurów na gniazdach?", ["Opiekę nad jajami u części form", "Brak piór", "Życie w morzu", "Pewną kradzież jaj"], 0, "Pozycje na gniazdach wskazują na zachowania związane z opieką."], ["Czego nie wolno wnioskować z samego dużego pazura?", ["Że mógł pełnić funkcję", "Że służył wyłącznie do ataku", "Że był częścią kończyny", "Że ma budowę kostną"], 1, "Pazury mogły pełnić różne funkcje."]]));
  M.push(module(8, "Zauropody – najwięksi mieszkańcy lądu", "Poznasz budowę, ekologię i rozwój zauropodów, największych znanych zwierząt lądowych.", [{"id": "d8-f1", "caption": "Przegląd kluczowych zagadnień modułu: Zauropody – najwięksi mieszkańcy lądu.", "alt": "Schemat omawiający temat modułu 8: Zauropody – najwięksi mieszkańcy lądu."}, {"id": "d8-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 8.", "alt": "Ilustracja wspierająca naukę w module 8."}], [["Jak zauropody osiągnęły gigantyczne rozmiary?", "Gigantyzm zauropodów wynikał z połączenia szybkiego wzrostu, lekkiego lecz mocnego szkieletu, wydajnego oddychania i sposobu pobierania pokarmu bez dokładnego żucia.", "Nie można wskazać pojedynczej przyczyny: rozmiar jest wynikiem współdziałania anatomii, fizjologii i warunków środowiska."], ["Długie szyje i ogony", "Wydłużona szyja zwiększała zasięg żerowania, a ogon pomagał równoważyć ciało. Kręgi szyjne często miały pneumatyzację, która zmniejszała masę bez utraty wytrzymałości.", "Dokładna pozycja szyi w życiu zwierzęcia jest modelowana z kości i stawów, lecz nie zachowuje się bezpośrednio."], ["Diplodoki", "Diplodoki, w tym <em>Diplodocus</em>, miały bardzo długie, nisko osadzone szyje i ogony oraz smukłe czaszki. Ich zęby skupiały się z przodu pyska.", "Kształt zębów wskazuje na sposób pobierania pokarmu, ale sam nie pozwala odtworzyć pełnego jadłospisu."], ["Brachiozaury", "Brachiozaury wyróżniały się dłuższymi kończynami przednimi niż tylnymi oraz wysokim położeniem barków. To odróżnia je od smuklejszych diplodoków.", "Wysoka sylwetka nie jest równoznaczna z ciągłym żerowaniem na samych najwyższych gałęziach."], ["Tytanozaury", "Tytanozaury były bardzo zróżnicowane i szczególnie ważne w późnej kredzie. Wśród nich były zarówno olbrzymy, jak i mniejsze formy, a część miała osteodermy.", "Masy rekordowych tytanozaurów są szacunkami zależnymi od kompletności szkieletu i wybranych modeli objętości."], ["Dieta zauropodów", "Zauropody zrywały rośliny zębami i połykały je w większych porcjach. Fermentacja mikrobiologiczna w przewodzie pokarmowym prawdopodobnie pomagała trawić włóknisty pokarm.", "Gastrolity znalezione przy niektórych okazach nie dowodzą, że wszystkie zauropody używały kamieni do rozcierania roślin."], ["Wzrost i rozwój", "Przekroje kości pokazują, że wiele zauropodów rosło szybko, lecz tempo mogło różnić się między gatunkami i etapami życia. Młode nie były miniaturowymi kopiami dorosłych.", "Wiek osobnika ocenia się z wielu wskaźników, ponieważ same rozmiary kości mogą zależeć od gatunku i środowiska."], ["Obrona przed drapieżnikami", "Duży rozmiar, ogon, życie w grupie i wzrost młodych mogły zmniejszać ryzyko drapieżnictwa. Bezpośrednie dowody obejmują na przykład ślady ugryzień i uszkodzenia kości.", "Pojedynczy ślad nie odtwarza całej interakcji; mógł powstać podczas ataku, żerowania na padlinie lub po śmierci zwierzęcia."]], [["Co pomagało zauropodom osiągać wielkie rozmiary?", ["Połączenie kilku adaptacji", "Tylko długie pazury", "Skrzela", "Brak kości"], 0, "Gigantyzm wynikał z wielu współdziałających cech."], ["Jaką rolę mogła pełnić długa szyja?", ["Zwiększać zasięg żerowania", "Zastępować ogon", "Umożliwiać oddychanie pod wodą", "Tworzyć pancerz"], 0, "Długa szyja pozwalała sięgać po pokarm w większym obszarze."], ["Co wyróżniało brachiozaury?", ["Dłuższe kończyny przednie niż tylne", "Buławę ogonową", "Brak kręgów szyjnych", "Baterie zębowe"], 0, "Brachiozaury miały wyższe barki dzięki proporcjom kończyn."], ["Czy gastrolity dowodzą używania ich przez wszystkie zauropody?", ["Tak", "Nie", "Tylko w jurze", "Tylko w kredzie"], 1, "Znaleziska przy niektórych okazach nie dają podstaw do uogólnienia na wszystkie."], ["Co może świadczyć o wieku i wzroście zauropoda?", ["Przekroje kości", "Kolor ilustracji", "Tylko długość ogona", "Nazwa gatunku"], 0, "Mikrostruktura kości dostarcza danych o wzroście."]]));
  M.push(module(9, "Dinozaury roślinożerne", "Porównasz roślinożerne dinozaury i ich różne sposoby pobierania pokarmu oraz obrony.", [{"id": "d9-f1", "caption": "Przegląd kluczowych zagadnień modułu: Dinozaury roślinożerne.", "alt": "Schemat omawiający temat modułu 9: Dinozaury roślinożerne."}, {"id": "d9-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 9.", "alt": "Ilustracja wspierająca naukę w module 9."}], [["Stegozaury", "Stegozaury miały małe głowy, płyty na grzbiecie i kolce na końcu ogona. Budowa ich zębów wskazuje na przetwarzanie roślin inne niż u hadrozaurów.", "Płyty mogły służyć jednocześnie sygnalizacji, rozpoznawaniu i regulacji wymiany ciepła; pojedyncza funkcja nie wyczerpuje możliwości."], ["Ankylozaury", "Ankylozaury miały szeroki tułów osłonięty osteodermami, a u ankylozaurydów występowała buława ogonowa. Pancerz był częścią skóry, nie zewnętrzną zbroją z luźnych kości.", "Skuteczność obrony zależała także od zachowania i ułożenia ciała, których kości nie zapisują wprost."], ["Iguanodonty", "Iguanodonty obejmują formy o różnej budowie, często z charakterystycznym kolcem kciuka. Wiele mogło poruszać się dwunożnie i czworonożnie zależnie od sytuacji.", "Odciski stóp i budowa kończyn pomagają oceniać lokomocję, ale nie uzasadniają prostego podziału na „zawsze” dwunożne lub czworonożne."], ["Hadrozaury", "Hadrozaury miały baterie zębowe, w których wiele zębów tworzyło powierzchnię ścierającą. Dzięki temu skutecznie przetwarzały różne części roślin.", "Sama obecność baterii zębowej nie wskazuje dokładnego gatunku rośliny w diecie bez dodatkowych danych."], ["Ceratopsy", "Ceratopsy używały rogowych dziobów i baterii zębowych do pobierania oraz rozdrabniania pokarmu. Duże późnokredowe formy były zwykle czworonożne.", "Kryza i rogi nie dowodzą automatycznie walk samców; funkcje ozdób mogą być wielorakie."], ["Pachycefalozaury", "Pachycefalozaury miały pogrubione sklepienie czaszki oraz ozdoby kostne. Ich małe zęby i budowa szczęk są zgodne z dietą roślinną lub wszystkożerną.", "Hipoteza o zderzaniu głowami jest testowana biomechanicznie, ale nie stanowi pewnego zachowania wszystkich gatunków."], ["Jak różne grupy zdobywały pokarm?", "Roślinożercy różnili się wysokością żerowania, sposobem odcinania roślin, wymianą zębów i wielkością ciała. Takie różnice mogły ograniczać konkurencję w jednym ekosystemie.", "Podział zasobów jest hipotezą ekologiczną, którą trzeba konfrontować z anatomią, roślinami kopalnymi i składem zespołu."], ["Obrona przed drapieżnikami", "Rogi, kolce, pancerze, ogony, rozmiary oraz zachowania stadne mogły działać obronnie. Strategie obrony były prawdopodobnie odmienne u młodych i dorosłych.", "Nie zakładaj, że każda widoczna struktura powstała wyłącznie do walki; cechy mogą łączyć funkcje obronne i komunikacyjne."]], [["Co tworzyło ochronę ankylozaurów?", ["Osteodermy", "Pióra lotne", "Skrzela", "Futro"], 0, "Pancerz ankylozaurów zawierał osteodermy."], ["Która grupa miała charakterystyczny kolec kciuka?", ["Iguanodonty", "Tyranozaury", "Dromeozaury", "Zauropody"], 0, "Kolec kciuka jest znaną cechą wielu iguanodontów."], ["Jaką funkcję miały baterie zębowe hadrozaurów?", ["Ścieranie pokarmu", "Odbieranie dźwięku", "Lot", "Pływanie"], 0, "Wiele współpracujących zębów tworzyło powierzchnię ścierającą."], ["Czy rogi i kryzy ceratopsów musiały służyć wyłącznie do walki?", ["Tak", "Nie, mogły mieć różne funkcje", "Tylko do pływania", "Tylko do kopania"], 1, "Struktury ozdobne mogły łączyć funkcje obronne i komunikacyjne."], ["Co oznacza podział zasobów między roślinożercami?", ["Możliwe wykorzystywanie różnych pokarmów lub wysokości żerowania", "Brak roślin", "Że wszystkie były samotne", "Wymieranie natychmiastowe"], 0, "Różnice w sposobie żerowania mogły ograniczać konkurencję."]]));
  M.push(module(10, "Anatomia dinozaura", "Poznasz, czego kości, ślady i porównania z żyjącymi ptakami oraz krokodylami uczą o anatomii dinozaurów.", [{"id": "d10-f1", "caption": "Przegląd kluczowych zagadnień modułu: Anatomia dinozaura.", "alt": "Schemat omawiający temat modułu 10: Anatomia dinozaura."}, {"id": "d10-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 10.", "alt": "Ilustracja wspierająca naukę w module 10."}], [["Szkielet", "Szkielet dinozaura obejmuje czaszkę, kręgosłup, żebra, obręcze i kończyny. Kości zachowują się często, ale po śmierci mogą zostać zdeformowane lub przemieszczone.", "Rekonstrukcja zaczyna się od opisu zachowanych elementów i ich położenia, a dopiero potem przechodzi do interpretacji całego zwierzęcia."], ["Czaszka", "Czaszki dinozaurów były złożone z wielu kości i otworów. Układ okien czaszkowych, zębów oraz miejsc przyczepu mięśni pomaga oceniać odżywianie i zmysły.", "Brak fragmentu czaszki nie może być dowolnie uzupełniany wzorem z innego gatunku; podobieństwo wymaga uzasadnienia."], ["Zęby i szczęki", "Kształt korony zęba, ząbkowanie i ślady zużycia informują o pobieraniu pokarmu. Dinozaury stale wymieniały zęby, lecz tempo wymiany różniło się między liniami.", "Ząbkowany ząb nie jest jednoznaczną etykietą diety, ponieważ mięsożerność i roślinożerność ocenia się z całego aparatu pokarmowego."], ["Kręgosłup", "Kręgosłup składał się z kręgów szyjnych, grzbietowych, krzyżowych i ogonowych. Ich budowa wpływała na ruch szyi, tułowia i ogona oraz na miejsca przyczepu mięśni.", "Liczba kręgów może być niepewna, jeśli szkielet jest niekompletny lub elementy zostały przesunięte przez procesy pośmiertne."], ["Kończyny", "Kończyny przednie i tylne miały odmienne funkcje u różnych grup: podpieranie masy, chwytanie, kopanie, obrona albo lot u ptaków. Proporcje kości są ważnym źródłem danych biomechanicznych.", "Długość kości nie wystarcza do pełnej rekonstrukcji postawy bez informacji o stawach, chrząstkach i mięśniach."], ["Pazury", "Pazury były rogowo-kostnymi strukturami, z których zwykle zachowuje się jedynie rdzeń kostny. Ich zakrzywienie i rozmiar mogą wiązać się z funkcją, ale interpretacja wymaga porównań.", "Ten sam kształt pazura może sprawdzać się przy chwytaniu, kopaniu, obronie lub poruszaniu po podłożu."], ["Ogony", "Ogon pomagał równoważyć ciało dinozaurów dwunożnych, a u części grup pełnił również funkcje obronne lub sygnalizacyjne. Liczba i budowa kręgów ogonowych były zróżnicowane.", "Nie każdy długi ogon był automatycznie biczem; zakres ruchu zależy od stawów i mięśni, które zachowują się słabo."], ["Rogi, kryzy i pancerze", "Rogi, kryzy, płyty i osteodermy powstawały z kości oraz pokrywających je tkanek. Mogły uczestniczyć w obronie, rozpoznawaniu i komunikacji wewnątrzgatunkowej.", "Widoczna kość nie zawsze oddaje pełny zewnętrzny kształt, ponieważ rogową osłonę i skórę rzadko znajdujemy zachowane."], ["Układ oddechowy", "U wielu dinozaurów, zwłaszcza zauropodów i teropodów, kości noszą ślady pneumatyzacji związanej z workami powietrznymi; ich widoczne otwory określa się jako pneumatopory. Ptaki zachowały bardzo wydajny, przepływowy system oddychania.", "Nie znamy wszystkich szczegółów układu oddechowego wymarłych gatunków, lecz porównania z ptakami i krokodylami ograniczają hipotezy."], ["Mięśnie", "Mięśnie nie zachowują się zwykle jako skamieniałości, ale zostawiają na kościach blizny i grzebienie przyczepów. Ich rekonstrukcję wspiera porównanie z ptakami i krokodylami.", "Wielkość mięśnia z samej kości ma ograniczoną pewność; modele powinny podawać założenia i zakres możliwych wyników."], ["Narządy wewnętrzne – co możemy o nich wiedzieć?", "O narządach wewnętrznych wnioskujemy pośrednio z budowy żeber, miednicy, jam ciała oraz bliskich żyjących krewnych. Wyjątkowe skamieniałości mogą zachować zarysy miękkich tkanek.", "Większość szczegółów pozostaje hipotezą, dlatego nie należy rysować narządów z pozorną precyzją bez mocnych podstaw."]], [["Co może zniekształcić układ kości w skamieniałości?", ["Procesy pośmiertne", "Tylko kolor skały", "Nazwa gatunku", "Brak mięśni"], 0, "Kości mogą zostać przesunięte i zdeformowane po śmierci."], ["Co informuje o pobieraniu pokarmu?", ["Kształt i zużycie zębów", "Tylko długość ogona", "Barwa ilustracji", "Miejsce w muzeum"], 0, "Korony, ząbkowanie i ślady zużycia dają dane o uzębieniu."], ["Co zwykle zachowuje się z pazura?", ["Rdzeń kostny", "Cała keratynowa osłona zawsze", "Mięśnie", "Skóra w każdym okazie"], 0, "Rogowa osłona rzadko zachowuje się jako skamieniałość."], ["Z czym wiąże się pneumatyzacja kości?", ["Workami powietrznymi", "Mlekiem", "Skrzelami", "Łuskami"], 0, "Pneumatyzacja u wielu dinozaurów wiąże się z układem worków powietrznych."], ["Jak odtwarza się mięśnie wymarłych dinozaurów?", ["Z przyczepów kostnych i porównań", "Wyłącznie z ilustracji", "Z koloru zębów", "Nie da się w ogóle"], 0, "Blizny przyczepów i porównania z krewnymi ograniczają rekonstrukcję."]]));
  M.push(module(11, "Jak poruszały się dinozaury?", "Dowiesz się, jak kości, stawy i ślady pomagają badać lokomocję dinozaurów.", [{"id": "d11-f1", "caption": "Przegląd kluczowych zagadnień modułu: Jak poruszały się dinozaury?.", "alt": "Schemat omawiający temat modułu 11: Jak poruszały się dinozaury?."}, {"id": "d11-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 11.", "alt": "Ilustracja wspierająca naukę w module 11."}], [["Chód dwunożny i czworonożny", "Dinozaury mogły być dwunożne, czworonożne albo wykorzystywać oba sposoby w różnych sytuacjach. Miednica, proporcje kończyn i ślady stóp są kluczowe dla oceny postawy.", "Jedna ścieżka tropów pokazuje konkretne przejście, nie pełen repertuar ruchu gatunku przez całe życie."], ["Jak szybko mogły biegać?", "Prędkość szacuje się z długości kroku, wysokości biodra i modeli biomechanicznych. Wyniki są zakresami, ponieważ dokładna masa, tkanki miękkie i tempo ruchu są nieznane.", "Wysoka prędkość z filmu lub gry nie jest dowodem naukowym; rekordowe wartości wymagają zgodności kilku rodzajów danych."], ["Tropienie dinozaurów na podstawie śladów", "Tropy są ichnoskamieniałościami, czyli zapisem zachowania, a nie kośćmi zwierzęcia. Wielkość, układ palców i kolejność odcisków mówią o kontakcie stopy z podłożem.", "Autor tropu bywa niepewny, dlatego ichnotaksony nie muszą odpowiadać konkretnym gatunkom znanym ze szkieletu."], ["Równowaga i rola ogona", "U dwunożnych dinozaurów ogon działał jako przeciwwaga dla tułowia i głowy. Mięśnie ogona mogły również napędzać tylną kończynę.", "Pozycję ogona w życiu ocenia się z kręgów i przyczepów, a nie z przypadkowego ułożenia skamieniałości po śmierci."], ["Czy dinozaury potrafiły pływać?", "Wiele dinozaurów prawdopodobnie umiało przekraczać wodę, lecz pływanie nie czyniło ich zwierzętami wodnymi. Tropy z podłoża oraz anatomia mogą wskazywać na kontakt z wodą.", "Ślady przypominające ruch w wodzie są trudne do interpretacji i wymagają dobrego rozpoznania osadu."], ["Wspinanie się i skakanie", "Niektóre małe teropody miały zakrzywione pazury i proporcje kończyn zgodne z poruszaniem w złożonym środowisku. Skakanie i wspinanie ocenia się ostrożnie przez porównania biomechaniczne.", "Nie można automatycznie przenosić zachowania współczesnego ptaka na każdy wymarły gatunek tylko z powodu wspólnego pochodzenia."]], [["Jakie dane są szczególnie ważne dla oceny chodu?", ["Miednica, kończyny i tropy", "Tylko kolor skóry", "Wyłącznie zęby", "Nazwa warstwy"], 0, "Postawę ocenia się na podstawie kości oraz śladów."], ["Czy prędkość dinozaura jest zwykle pojedynczą pewną liczbą?", ["Tak", "Nie, jest zakresem szacunków", "Tylko dla teropodów", "Tylko dla zauropodów"], 1, "Modele zależą od założeń i niepewnych danych."], ["Czym są tropy dinozaurów?", ["Ichnoskamieniałościami", "Kośćmi czaszki", "Piórami", "Osteodermami"], 0, "Tropy zapisują aktywność, a nie szkielet autora."], ["Dlaczego nie zawsze znamy gatunek autora tropu?", ["Ślad może mieć podobną formę u różnych zwierząt", "Tropy nie mają palców", "Dinozaury nie chodziły", "Kości nie istnieją"], 0, "Ichnotakson nie musi odpowiadać nazwanemu gatunkowi szkieletowemu."], ["Co mogło pomagać w równowadze dwunożnego dinozaura?", ["Ogon", "Kryza", "Skrzela", "Muszla"], 0, "Ogon stanowił przeciwwagę dla reszty ciała."]]));
  M.push(module(12, "Skóra, łuski, pióra i kolory", "Poznasz źródła danych o zewnętrznym wyglądzie dinozaurów oraz granice tego, co można zrekonstruować.", [{"id": "d12-f1", "caption": "Przegląd kluczowych zagadnień modułu: Skóra, łuski, pióra i kolory.", "alt": "Schemat omawiający temat modułu 12: Skóra, łuski, pióra i kolory."}, {"id": "d12-f2", "caption": "Dowody i rekonstrukcje wykorzystywane w module 12.", "alt": "Ilustracja wspierająca naukę w module 12."}], [["Co wiemy o skórze dinozaurów?", "Odciski skóry i wyjątkowo zachowane okazy wskazują, że niektóre dinozaury miały łuski, inne pióra, a część mogła łączyć różne pokrycia ciała.", "Brak odcisku skóry w większości znalezisk wynika z trudności zachowania miękkich tkanek, a nie z pewności co do ich braku."], ["Łuski", "Łuski dinozaurów były strukturami skórnymi z keratynową warstwą zewnętrzną. Odciski mogą ujawniać ich rozmiar i układ, lecz zwykle nie zachowują pierwotnego koloru.", "Łuski u dinozaurów nie czynią ich „współczesnymi jaszczurkami”; ptaki także mają łuski na stopach."], ["Początki piór", "Najwcześniejsze pióra i struktury pióropodobne prawdopodobnie pełniły funkcje izolacyjne oraz komunikacyjne. Złożone pióra lotne są późniejszą specjalizacją części teropodów.", "Proste filamenty nie muszą oznaczać zdolności lotu, a podobne struktury wymagają dokładnej analizy zachowania."], ["Dinozaury pierzaste", "Wiele maniraptorów, w tym dromeozaury i owiraptorozaury, zachowało dowody piór. Ptaki są jedyną żyjącą linią pierzastych dinozaurów.", "Pióra nie były ograniczone do zwierząt małych, choć szansa ich zachowania jest najwyższa w wyjątkowych osadach."], ["Do czego służyły pióra?", "Pióra mogły izolować ciało, pomagać w pokazach, osłaniać jaja, wspierać równowagę lub umożliwiać lot. Funkcja zależała od budowy pióra i całej anatomii zwierzęcia.", "Nie należy zakładać, że każde pióro służyło do latania; lot powstał w obrębie już pierzastej linii."], ["Czy znamy kolory dinozaurów?", "W kilku wyjątkowych okazach analizuje się melanosomy, mikroskopijne struktury związane z pigmentami. Ich kształt i rozmieszczenie mogą sugerować pewne wzory barw.", "Rekonstrukcja koloru jest ograniczona: nie wszystkie pigmenty zachowują się tak samo, a barwy strukturalne są trudniejsze do odtworzenia."], ["Jak rekonstruuje się wygląd wymarłych zwierząt?", "Dobra rekonstrukcja łączy kości, odciski tkanek, ślady skóry, histologię oraz porównania z żyjącymi ptakami i krokodylami. Każdy element powinien mieć poziom pewności.", "Ilustracja naukowa nie jest fotografią przeszłości: tam, gdzie brakuje dowodów, należy wyraźnie zaznaczyć hipotezę."]], [["Co może zachować się jako dowód pokrycia ciała?", ["Odcisk skóry lub piór", "Tylko nazwa gatunku", "Wyłącznie kolor skały", "Zawsze kompletne futro"], 0, "Wyjątkowe skamieniałości mogą zachować odciski tkanek."], ["Czy łuski u dinozaurów wykluczają pokrewieństwo ptaków?", ["Tak", "Nie", "Tylko u zauropodów", "Tylko w kredzie"], 1, "Ptaki również mają łuski, na przykład na stopach."], ["Jaka funkcja piór istniała przed lotem?", ["Izolacja i sygnalizacja", "Produkcja zębów", "Tworzenie kości", "Oddychanie skrzelami"], 0, "Pióra pełniły funkcje niezwiązane z lotem."], ["Co analizuje się przy ostrożnej rekonstrukcji części barw?", ["Melanosomy", "Tylko pazury", "Długość szyi", "Kształt tropu"], 0, "Melanosomy mogą dostarczać pośrednich danych o pigmentacji."], ["Dlaczego rekonstrukcja wyglądu nie jest fotografią przeszłości?", ["Część szczegółów pozostaje hipotezą", "Dinozaury nie miały wyglądu", "Kości są kolorowe", "Nie istnieją ilustracje"], 0, "Dane o tkankach miękkich są niepełne i mają różny poziom pewności."]]));
})();
// course-dino-2.js
(function () {
  window.COURSE_DINO = window.COURSE_DINO || { id: 'dino-all', modules: [] };
  var M = window.COURSE_DINO.modules;

  function shortDesc(txt) {
    var plain = String(txt).replace(/<[^>]+>/g, '');
    var cut = plain.split(/(?<=\.)\s/)[0] || plain;
    if (cut.length > 165) cut = cut.slice(0, 162).replace(/\s+\S*$/, '') + '…';
    return cut;
  }

  function lesson(moduleNumber, index, title, focus, evidence, caution) {
    var item = {
      id: 'd' + moduleNumber + '-l' + index,
      title: title,
      desc: shortDesc(focus),
      duration: 9 + (index % 6),
      body: [
        '<p><strong>' + title + '</strong> to temat, którego nie można obserwować bezpośrednio u wymarłych zwierząt. Paleontolodzy łączą dane o kościach, śladach, osadach i żyjących krewnych, przede wszystkim ptakach oraz krokodylach. W tej lekcji oddzielamy obserwację od interpretacji i pytamy, jakie informacje rzeczywiście zachował zapis kopalny.</p>',
        '<h3>Dowody, porównania i granice wnioskowania</h3>',
        '<p>' + focus + ' ' + evidence + ' Pojedyncza skamieniałość rzadko rozstrzyga sprawę, dlatego wynik powinien być zgodny z anatomią, geologią stanowiska i porównaniem wielu okazów. Najmocniejsze interpretacje wskazują także, czego dane nie pozwalają jeszcze ustalić.</p>',
        '<p>Przydatne są porównania z dzisiejszymi ptakami, lecz nie wolno traktować współczesnego gatunku jako dosłownego modelu dinozaura. Biologia organizmu zależała od jego rozmiaru, wieku, środowiska i miejsca na drzewie ewolucyjnym. ' + caution + '</p>',
        '<ul><li>Najpierw nazwij obserwację, a dopiero potem możliwe wyjaśnienie.</li><li>Sprawdź, czy niezależne rodzaje danych prowadzą do podobnego wniosku.</li><li>Używaj słów „prawdopodobnie” i „hipoteza”, gdy dowody nie są rozstrzygające.</li></ul>',
        '<blockquote>Dobra rekonstrukcja życia dinozaura jest sprawdzalną hipotezą, a nie sceną dopisaną przez wyobraźnię.</blockquote>'
      ]
    };
    if (index % 2 === 0) {
      item.figure = {
        caption: 'Schemat pomocniczy do lekcji „' + title + '”.',
        alt: 'Ilustracja przedstawiająca dowody paleontologiczne omawiane w lekcji: ' + title + '.'
      };
    }
    return item;
  }

  function moduleData(number, title, summary, theme, lessons, quiz) {
    var builtLessons = [];
    var i;
    for (i = 0; i < lessons.length; i += 1) {
      builtLessons.push(lesson(number, i + 1, lessons[i][0], lessons[i][1], lessons[i][2], lessons[i][3]));
    }
    M.push({
      id: 'd' + number,
      num: number,
      title: title,
      summary: summary,
      figures: [
        {
          id: 'd' + number + '-f1',
          caption: 'Rekonstrukcja zagadnienia: ' + theme + '.',
          alt: 'Edukacyjna ilustracja związana z modułem „' + title + '”.'
        },
        {
          id: 'd' + number + '-f2',
          caption: 'Zapis kopalny i metody badań omawiane w module.',
          alt: 'Schemat pokazujący, jak paleontolodzy łączą skamieniałości z interpretacją biologiczną.'
        }
      ],
      lessons: builtLessons,
      quiz: quiz
    });
  }

  moduleData(13, 'Zmysły dinozaurów', 'Jak z anatomii czaszki, ucha i porównań z ptakami odtwarza się możliwości zmysłowe dinozaurów.', 'zmysły dinozaurów', [
    ['Wzrok', 'Wielkość oczodołu i pierścienia twardówkowego może wskazywać na wielkość oka oraz względną aktywność w świetle dziennym albo słabym.', 'Tomografia czaszki pozwala oglądać kanały nerwów wzrokowych i kształt wnętrza czaszki bez niszczenia okazu.', 'Nie daje to jednak pełnego obrazu ostrości widzenia ani barw rozpoznawanych przez dany gatunek.'],
    ['Węch', 'Opuszki węchowe rekonstruowane na endokastach sugerują, że u części dinozaurów węch był ważny w zdobywaniu pokarmu i kontaktach społecznych.', 'Znaczenie ma porównanie ich względnej wielkości z blisko spokrewnionymi zwierzętami, a nie sam rozmiar czaszki.', 'Duże opuszki nie są prostym dowodem na jeden konkretny sposób zachowania.'],
    ['Słuch', 'Długość przewodu słuchowego i budowa ucha wewnętrznego pomagają oszacować zakres częstotliwości najlepiej odbieranych przez zwierzę.', 'U ptaków i krokodyli elementy ucha łączą się z czułością na dźwięk, co daje ostrożny punkt odniesienia.', 'Nie znamy głosu większości dinozaurów, więc nie można pewnie odtwarzać ich odgłosów.'],
    ['Równowaga', 'Kanały półkoliste w labiryncie kostnym rejestrują ruchy głowy i są związane z utrzymywaniem równowagi.', 'Ich kształt bada się w skanach tomograficznych, a następnie porównuje z anatomią żyjących kręgowców.', 'Sama geometria kanałów nie wyznacza dokładnej zwinności ani pozycji szyi.'],
    ['Jak badamy zmysły wymarłych zwierząt?', 'Badania łączą tomografię komputerową, odlewy wnętrza czaszki, mikroskopię i porównania ewolucyjne.', 'Kości zachowują jedynie część informacji o narządach miękkich, dlatego różne metody muszą się wzajemnie kontrolować.', 'Wynik jest rekonstrukcją prawdopodobieństwa, a nie pomiarem wykonanym na żywym dinozaurze.'],
    ['Które dinozaury miały szczególnie rozwinięte zmysły?', 'Drapieżne teropody i niektóre małe formy ptasie wykazują cechy sugerujące sprawne widzenie, równowagę lub węch.', 'Warto analizować funkcjonalną kombinację wielu cech, na przykład oka, ucha i sposobu poruszania się.', 'Nie istnieje jedna obiektywna lista „najlepszych zmysłów”, niezależna od trybu życia.']
  ], [
    { q: 'Co może pomóc w badaniu ucha wewnętrznego dinozaura?', options: ['Tomografia czaszki', 'Kolor skały', 'Długość pazurów', 'Masa osadu'], answer: 0, why: 'Tomografia pozwala zobaczyć zachowane przestrzenie ucha wewnętrznego w skale lub kości.' },
    { q: 'Czego nie można pewnie odczytać wyłącznie z pierścienia twardówkowego?', options: ['Że zwierzę miało oczy', 'Dokładnych kolorów, które widziało', 'Względnej wielkości oka', 'Kształtu otworu oczodołu'], answer: 1, why: 'Pierścień może dostarczać wskazówek o oku, ale nie odtwarza wprost percepcji barw.' },
    { q: 'Z czym związane są kanały półkoliste?', options: ['Trawieniem roślin', 'Wytwarzaniem piór', 'Równowagą i ruchami głowy', 'Wzrostem zębów'], answer: 2, why: 'Kanały półkoliste są częścią układu przedsionkowego odpowiedzialnego za wykrywanie ruchów głowy.' },
    { q: 'Dlaczego porównuje się dinozaury z ptakami i krokodylami?', options: ['Są ich najbliższymi żyjącymi krewnymi wśród archozaurów', 'Mają identyczne mózgi', 'Żyją w tych samych epokach', 'Nie mają różnic anatomicznych'], answer: 0, why: 'Ptaki i krokodyle są ważnymi żyjącymi punktami odniesienia dla interpretacji cech archozaurów.' },
    { q: 'Jaki język jest właściwy przy rekonstrukcji zmysłów?', options: ['„Dowiedziono każdego szczegółu”', '„To na pewno wyglądało tak samo”', '„Prawdopodobnie, na podstawie kilku danych”', '„Fakty nie są potrzebne”'], answer: 2, why: 'Narządy miękkie zachowują się słabo, więc wnioski o zmysłach mają różny stopień pewności.' }
  ]);

  moduleData(14, 'Inteligencja dinozaurów', 'Jak ostrożnie interpretować mózgi, zachowania i zdolności poznawcze dinozaurów.', 'inteligencja i zachowanie', [
    ['Jak szacuje się wielkość mózgu?', 'Endokast, czyli odlew lub cyfrowy model jamy mózgowej, pozwala przybliżyć objętość struktur znajdujących się w czaszce.', 'U dinozaurów mózg nie wypełniał jamy czaszki tak samo jak u ssaków, dlatego oszacowania wymagają korekt.', 'Endokast nie jest odciskiem myśli ani pełną kopią tkanki nerwowej.'],
    ['Czy większy mózg oznacza większą inteligencję?', 'Absolutna wielkość mózgu rośnie wraz z rozmiarem ciała, dlatego ważne są proporcje i organizacja poszczególnych obszarów.', 'Współczynnik encefalizacji jest jednym z narzędzi porównań, ale nie mierzy inteligencji bezpośrednio.', 'Nie wolno układać zwierząt w prostej hierarchii na podstawie jednego wskaźnika.'],
    ['Inteligencja teropodów', 'Małe, aktywne teropody miały często relatywnie duże mózgi i rozwinięte narządy zmysłów w porównaniu z wieloma innymi dinozaurami.', 'Porównania z ptakami wskazują na możliwość złożonych zachowań, zwłaszcza u form bliskich ptakom.', 'Nie oznacza to, że wszystkie teropody miały zdolności poznawcze współczesnych kruków.'],
    ['Zachowania społeczne', 'Skupiska osobników, wspólne gniazda i równoległe tropy mogą wskazywać na tolerancję społeczną lub okresowe grupy.', 'Trzeba rozważyć, czy kości zgromadziły się za życia, czy zostały naniesione przez wodę po śmierci.', 'Jedno stanowisko nie dowodzi stałego stada o znanej strukturze społecznej.'],
    ['Rozwiązywanie problemów', 'Zdolność do uczenia się i elastycznego reagowania nie fosylizuje się, lecz można formułować ostrożne hipotezy przez porównania z ptakami.', 'Ważne są cechy związane z widzeniem, manipulowaniem pokarmem i złożonym środowiskiem, ale nie są one testem inteligencji.', 'Rekonstrukcja nie może przypisywać dinozaurom konkretnych eksperymentalnych umiejętności bez dowodów.'],
    ['Co jest nauką, a co spekulacją?', 'Naukowa interpretacja podaje materiał, metodę oraz konkurencyjne wyjaśnienia, a nie tylko atrakcyjną opowieść.', 'Hipoteza powinna być możliwa do sprawdzenia na nowych okazach lub przez analizę porównawczą.', 'Wyrazista scena filmowa może być inspiracją, lecz nie jest sama w sobie dowodem.']
  ], [
    { q: 'Czym jest endokast?', options: ['Modelem wnętrza jamy czaszki', 'Rodzajem zęba', 'Śladem stopy', 'Warstwą piór'], answer: 0, why: 'Endokast odtwarza przestrzeń w czaszce, która może dostarczać informacji o mózgu i nerwach.' },
    { q: 'Dlaczego sam rozmiar mózgu nie wystarcza do oceny zdolności poznawczych?', options: ['Mózg nie ma związku z ciałem', 'Należy uwzględniać rozmiar ciała i organizację mózgu', 'Wszystkie mózgi mają tę samą objętość', 'Skamieniałości nie mają czaszek'], answer: 1, why: 'Absolutny rozmiar mózgu zależy między innymi od rozmiaru zwierzęcia.' },
    { q: 'Co może sugerować skupisko równoległych tropów?', options: ['Pewne polowanie w grupie', 'Brak ruchu zwierząt', 'Możliwe wspólne przemieszczanie się', 'Identyczny wiek wszystkich osobników'], answer: 2, why: 'Równoległe tropy mogą wskazywać na wspólny ruch, ale nie rozstrzygają wszystkich szczegółów zachowania.' },
    { q: 'Która cecha odróżnia hipotezę naukową od swobodnej opowieści?', options: ['Możliwość sprawdzenia dowodami', 'Dramatyczny finał', 'Najwięcej bohaterów', 'Brak alternatyw'], answer: 0, why: 'Hipoteza naukowa musi być zestawiona z danymi i otwarta na testowanie.' },
    { q: 'Jak należy traktować porównania z krukami?', options: ['Jako dowód identycznego zachowania teropodów', 'Jako punkt odniesienia, nie dosłowną kopię przeszłości', 'Jako informację o dinozaurach roślinożernych wyłącznie', 'Jako zastępstwo skamieniałości'], answer: 1, why: 'Współczesne ptaki są ważne porównawczo, lecz ich zachowanie nie jest bezpośrednim zapisem zachowania dinozaurów.' }
  ]);

  moduleData(15, 'Życie codzienne dinozaurów', 'Co tropy, kości i środowisko mówią o codziennym funkcjonowaniu dinozaurów.', 'codzienne zachowania dinozaurów', [
    ['Poszukiwanie pokarmu', 'Sposób zdobywania pożywienia zależał od budowy szczęk, zębów, szyi, kończyn oraz dostępności zasobów w środowisku.', 'Zużycie zębów, treść jamy brzusznej i ślady żerowania uzupełniają dane anatomiczne.', 'Nie każdy osobnik danego gatunku musiał wykorzystywać pokarm dokładnie w ten sam sposób.'],
    ['Odpoczynek i sen', 'Pozycje zachowanych szkieletów i porównania z ptakami sugerują, że dinozaury musiały mieć zachowania pozwalające oszczędzać energię.', 'Szczególnie interesujące są okazy małych teropodów zachowane w zwartej, ptasiej pozycji spoczynkowej.', 'Skamieniały szkielet może zostać przemieszczony po śmierci, więc nie każda pozycja jest pozycją snu.'],
    ['Migracje', 'Zmiany sezonowe zasobów mogły skłaniać niektóre populacje do wędrówek, ale długie migracje trudniej udowodnić niż samo przemieszczanie się.', 'Izotopy stabilne w zębach i kościach mogą rejestrować zmianę wody lub pokarmu podczas wzrostu zwierzęcia.', 'Różnice izotopowe mogą też wynikać ze zmian lokalnego środowiska, a nie z migracji.'],
    ['Życie samotne i stadne', 'Tropy, masowe nagromadzenia kości i zróżnicowane wiekowo grupy mogą świadczyć o czasowym albo trwałym skupianiu się osobników.', 'Najlepiej udokumentowane są sytuacje, w których ślady powstały w tym samym osadzie i zachowują wspólny kierunek.', 'Blisko leżące kości nie zawsze oznaczają, że zwierzęta żyły razem.'],
    ['Terytorialność', 'Obrona zasobów lub miejsc rozrodu jest możliwa u wielu zwierząt, lecz zachowania terytorialne pozostawiają mało jednoznacznych śladów.', 'Powtarzalne miejsca gniazdowania i ornamentacja wykorzystywana w pokazach mogą stanowić poszlaki.', 'Nie można nazwać konkretnego gatunku terytorialnym tylko dlatego, że miał rogi lub duże rozmiary.'],
    ['Komunikacja', 'Sygnały wizualne, postawa, pióra, barwy oraz dźwięki prawdopodobnie pomagały dinozaurom w kontaktach z innymi osobnikami.', 'Grzebienie kostne i rozbudowane jamy nosowe mogą być badane pod kątem funkcji, lecz jedna struktura może pełnić kilka ról.', 'Dokładny repertuar głosów pozostaje zwykle poza zasięgiem danych kopalnych.'],
    ['Walki między osobnikami', 'Urazy kości, ślady ugryzień oraz asymetryczne poroża lub rogi mogą wiązać się z konfliktami między osobnikami tego samego gatunku.', 'Gojenie urazów pomaga odróżnić obrażenie odniesione za życia od uszkodzenia po śmierci.', 'Nawet zagojona rana nie mówi pewnie, czy powstała w walce, wypadku czy ataku drapieżnika.']
  ], [
    { q: 'Które dane mogą bezpośrednio wspierać interpretację diety?', options: ['Zużycie zębów i ślady żerowania', 'Tylko długość ogona', 'Wyłącznie kolor osadu', 'Nazwa gatunku'], answer: 0, why: 'Zużycie zębów i ślady żerowania są bezpośrednio związane z pobieraniem pokarmu.' },
    { q: 'Co mogą badać izotopy stabilne w tkankach kopalnych?', options: ['Kolor piór', 'Zmiany źródeł wody i pożywienia', 'Dokładny dźwięk głosu', 'Liczbę palców'], answer: 1, why: 'Skład izotopowy może odzwierciedlać środowisko i zasoby wykorzystywane przez zwierzę.' },
    { q: 'Dlaczego nagromadzenie kości nie jest automatycznie dowodem stada?', options: ['Kości nie mogą leżeć razem', 'Dinozaury nie żyły w grupach', 'Woda może zgromadzić szczątki po śmierci', 'Każdy szkielet jest z innej epoki'], answer: 2, why: 'Procesy pośmiertne mogą przenosić i koncentrować szczątki w jednym miejscu.' },
    { q: 'Co pomaga rozpoznać uraz odniesiony za życia?', options: ['Ślady gojenia kości', 'Obecność piasku', 'Brak zębów', 'Duży rozmiar okazu'], answer: 0, why: 'Kość może reagować na uraz za życia, tworząc tkankę gojącą.' },
    { q: 'Które stwierdzenie o komunikacji jest najostrożniejsze?', options: ['Znamy wszystkie dźwięki dinozaurów', 'Sygnały wizualne i dźwiękowe są prawdopodobne, ale szczegóły są niepewne', 'Komunikacja nie była potrzebna', 'Każdy grzebień służył tylko do wydawania dźwięków'], answer: 1, why: 'Anatomia pozwala formułować hipotezy o sygnałach, nie odtworzyć pełny repertuar zachowań.' }
  ]);

  moduleData(16, 'Polowanie i obrona', 'Jak anatomia, ślady urazów i ekologia pomagają badać strategie ataku oraz obrony.', 'strategie ataku i obrony', [
    ['Strategie drapieżników', 'Drapieżniki różniły się wielkością, sposobem poruszania i narzędziami chwytania, dlatego nie istniała jedna strategia polowania teropodów.', 'Budowa czaszki, szyi, kończyn i zębów wskazuje na możliwe funkcje, gdy zestawi się ją z mechanicznymi analizami.', 'Skuteczność konkretnego zachowania zależała również od ofiary oraz terenu.'],
    ['Polowanie samotne i grupowe', 'Wspólne występowanie drapieżników nie wystarcza, by dowieść współpracy podczas polowania.', 'Równoczesne tropy, wiek osobników i kontekst osadowy mogą wzmacniać albo osłabiać hipotezę grupowego żerowania.', 'Nawet współczesne zwierzęta tego samego gatunku mogą polować raz samotnie, a raz w skupieniu.'],
    ['Ugryzienie i pazury', 'Kształt zębów, siła szczęk i pazury kończyn mówią o sposobie chwytania, cięcia lub przytrzymywania zdobyczy.', 'Ślady zębów na kościach i modelowanie biomechaniczne pozwalają testować, czy dana konstrukcja znosiła określone obciążenia.', 'Pazur nie musi służyć wyłącznie do zabijania; mógł pomagać także w chwytaniu lub obronie.'],
    ['Rogi i kryzy', 'Rogi i kryzy mogły chronić, służyć pokazom albo rozpoznawaniu osobników, a ich funkcje trzeba oceniać wieloaspektowo.', 'Rozkład nacisku w kości, ślady urazów i porównania z żyjącymi zwierzętami dostarczają różnych rodzajów danych.', 'Efektowna struktura nie jest automatycznie dowodem regularnych pojedynków.'],
    ['Pancerze', 'Osteodermy, czyli kostne elementy skóry, występowały między innymi u ankylozaurów i mogły osłaniać wrażliwe części ciała.', 'Ich położenie rekonstruuje się z zachowanych układów oraz z porównania wielu okazów.', 'Stopień ochrony zależał od pokrycia ciała, grubości tkanek i kierunku ataku.'],
    ['Kolce', 'Kolce mogły zwiększać dystans do drapieżnika, pełnić funkcję pokazową albo pomagać w obronie bocznych części ciała.', 'Ważne są ich położenie, wytrzymałość i ślady przebudowy kostnej, nie tylko imponujący wygląd.', 'Bez bezpośredniego śladu kontaktu trudno wskazać jedną pewną funkcję kolca.'],
    ['Ogony jako broń', 'Sztywne lub masywne ogony niektórych dinozaurów mogły zadawać silne uderzenia, zwłaszcza gdy kończyły się buławą lub kolcami.', 'Biomechanika ocenia zakres ruchu i obciążenia, a uszkodzenia kości mogą dawać dodatkowe poszlaki.', 'Model mechaniczny nie jest nagraniem zachowania konkretnego zwierzęcia.'],
    ['Kamuflaż i ucieczka', 'Szybkość, zwrotność, rozmiar oraz możliwe ubarwienie wpływały na unikanie zagrożeń i wykrywanie ofiar.', 'U kilku pierzastych dinozaurów zachowane melanosomy pozwalają ostrożnie wnioskować o elementach barwy.', 'Barwa nie zachowuje się u większości okazów, a kamuflaż zależy od całego środowiska, nie od jednego pigmentu.']
  ], [
    { q: 'Co najlepiej testuje hipotezę o funkcji szczęk drapieżnika?', options: ['Modelowanie biomechaniczne i ślady zębów', 'Tylko popularność gatunku', 'Długość nazwy', 'Kolor muzealnej gabloty'], answer: 0, why: 'Biomechanika i ślady zębów odnoszą się bezpośrednio do działania aparatu gębowego.' },
    { q: 'Dlaczego wspólne kości drapieżników nie dowodzą wspólnego polowania?', options: ['Drapieżniki nie chodziły', 'Mogły zostać zgromadzone po śmierci', 'Kości nie są skamieniałościami', 'Każde zwierzę było roślinożerne'], answer: 1, why: 'Procesy osadowe i padlinożerstwo mogą tworzyć skupiska bez współpracy łowieckiej.' },
    { q: 'Czym są osteodermy?', options: ['Piórami skrzydeł', 'Śladami stóp', 'Kostnymi elementami skóry', 'Rodzajem zęba'], answer: 2, why: 'Osteodermy to kostne struktury rozwijające się w skórze, często tworzące pancerz.' },
    { q: 'Jaka interpretacja rogu jest najostrożniejsza?', options: ['Mógł mieć funkcje obronne, pokazowe lub obie', 'Zawsze służył tylko do walki', 'Nie miał żadnej funkcji', 'Dowodzi koloru zwierzęcia'], answer: 0, why: 'Jedna struktura może pełnić więcej niż jedną funkcję biologiczną.' },
    { q: 'Co ogranicza rekonstrukcję kamuflażu?', options: ['Wszystkie pióra zachowują pigment', 'Barwa zwykle nie zachowuje się w zapisie kopalnym', 'Dinozaury nie miały skóry', 'Szybkość nie ma znaczenia'], answer: 1, why: 'Dane o pigmentach są rzadkie, dlatego pełne ubarwienie większości gatunków jest nieznane.' }
  ]);

  moduleData(17, 'Co jadły dinozaury?', 'Jak zęby, treść pokarmowa, kamienie i odchody kopalne odsłaniają dietę dinozaurów.', 'dieta i sieci pokarmowe', [
    ['Mięsożerność', 'Mięsożerne dinozaury miały różnorodne uzębienie i sposoby zdobywania pokarmu, od małych owadożerców po duże drapieżniki.', 'Ząbkowane zęby, ślady ugryzień i zawartość jamy brzusznej mogą wspierać interpretację mięsożerności.', 'Ostre zęby same w sobie nie rozstrzygają, czy zwierzę aktywnie polowało, czy korzystało także z padliny.'],
    ['Roślinożerność', 'Roślinożercy musieli pobierać i przetwarzać duże ilości roślin o odmiennej twardości oraz wartości odżywczej.', 'Szerokość pyska, układ zębów, ślady zużycia i budowa szczęk pokazują różne sposoby skubania oraz rozdrabniania.', 'Nie należy zakładać, że wszystkie duże roślinożerne dinozaury jadły te same rośliny.'],
    ['Wszystkożerność', 'Wszystkożerność oznacza wykorzystywanie pokarmu roślinnego i zwierzęcego, a nie przypadkowe zjedzenie dowolnej rzeczy.', 'Zęby o mieszanej funkcji, niewielki rozmiar ciała i porównania z ptakami mogą sugerować szeroką dietę. Możliwość sezonowej zmiany pokarmu także należy brać pod uwagę.', 'Bez bezpośredniego materiału pokarmowego zakres diety pozostaje hipotezą.'],
    ['Rybożerność', 'Długi pysk, stożkowate zęby i środowisko wodne mogą wskazywać na chwytanie ryb lub innych zwierząt wodnych.', 'Przykłady takie jak <em>Spinosaurus</em> są badane przez anatomię, izotopy i znaleziska potencjalnej zdobyczy.', 'Nie oznacza to, że każde zwierzę o wydłużonym pysku żywiło się wyłącznie rybami.'],
    ['Zęby a dieta', 'Zęby są narzędziem ważnym dla diety, lecz trzeba badać ich mikrouszkodzenia, wymianę i pracę całej szczęki.', 'Heterodoncja, czyli zróżnicowanie zębów, może wskazywać na rozmaite funkcje pobierania i obróbki pokarmu.', 'Ten sam kształt zęba może działać inaczej w szczęce o odmiennej budowie.'],
    ['Gastrolity', 'Gastrolity to połknięte kamienie, które u części zwierząt mogły wspomagać mechaniczne rozdrabnianie pokarmu w żołądku.', 'Aby uznać kamienie za gastrolity, sprawdza się ich położenie, skład oraz prawdopodobieństwo przypadkowego naniesienia.', 'Kamienie obok szkieletu nie są automatycznie dowodem na ich funkcję trawienną.'],
    ['Koprolity', 'Koprolity, czyli skamieniałe odchody, mogą zawierać fragmenty kości, łusek, roślin albo pasożytów i wskazywać na dietę.', 'Ich interpretacja wymaga pewności, że obiekt jest koprolitem, a nie zwykłą bryłą osadu.', 'Zwykle nie da się przypisać pojedynczego koprolitu do konkretnego gatunku dinozaura.'],
    ['Łańcuchy pokarmowe', 'Dinozaury były częścią sieci pokarmowych obejmujących rośliny, bezkręgowce, kręgowce i rozkładaczy.', 'Relacje odtwarza się z wielu źródeł: skamieniałości, tropów, śladów zębów i środowiska osadzania.', 'Pojedynczy gatunek nie tworzy pełnego obrazu całego ekosystemu. Relacje zmieniały się też wraz z porami roku.']
  ], [
    { q: 'Który dowód na dietę jest najbardziej bezpośredni?', options: ['Zawartość jamy brzusznej', 'Wielkość muzeum', 'Nazwa formacji', 'Długość ekspozycji'], answer: 0, why: 'Zachowany pokarm bezpośrednio wiąże zwierzę z tym, co jadło.' },
    { q: 'Co oznacza heterodoncja?', options: ['Brak zębów', 'Zróżnicowanie zębów o różnych funkcjach', 'Wymianę piór', 'Wspólne gniazdo'], answer: 1, why: 'Heterodoncja to obecność zębów o różnym kształcie i funkcji.' },
    { q: 'Czym może być koprolit?', options: ['Kostnym pancerzem', 'Kamieniem z żołądka', 'Skamieniałym odchodem', 'Odciskiem pióra'], answer: 2, why: 'Koprolit to zachowany w postaci skamieniałości odchód.' },
    { q: 'Dlaczego kamienie przy szkielecie nie zawsze są gastrolitami?', options: ['Mogły zostać naniesione przez osad', 'Kamienie nie istnieją w skałach', 'Dinozaury nie miały żołądków', 'Gastrolity są zawsze metalowe'], answer: 0, why: 'Po śmierci zwierzęcia osad może przemieścić lub wprowadzić kamienie w okolice szkieletu.' },
    { q: 'Które stwierdzenie o <em>Spinosaurus</em> jest poprawne?', options: ['Jego wydłużony pysk dowodzi wyłącznej rybożerności', 'Anatomia i inne dane sugerują związek z pokarmem wodnym, lecz dieta mogła być szersza', 'Nie był dinozaurem', 'Nie miał zębów'], answer: 1, why: 'Różne dane wskazują na wykorzystywanie zasobów wodnych, ale nie uzasadniają skrajnego uproszczenia diety.' }
  ]);

  moduleData(18, 'Miłość, rozmnażanie i rodzicielstwo', 'Co można powiedzieć o rozrodzie dinozaurów na podstawie jaj, gniazd i szkieletów.', 'rozmnażanie oraz opieka', [
    ['Zaloty', 'Pokazy postawy, pióra, grzebienie i dźwięki są prawdopodobnymi elementami zalotów, lecz bezpośrednie dowody są rzadkie.', 'Struktury ozdobne ocenia się przez ich wzrost, zróżnicowanie między osobnikami i możliwą widoczność.', 'Nie można odtworzyć konkretnego tańca godowego tylko z efektownej kości czaszki.'],
    ['Dymorfizm płciowy', 'Dymorfizm płciowy to różnice między samcami i samicami tego samego gatunku, na przykład w rozmiarze lub ornamentacji.', 'Do jego wykazania potrzebna jest duża seria osobników w podobnym wieku i z dobrze rozpoznanym gatunkiem.', 'Różnice mogą wynikać z wieku, zmienności osobniczej albo błędnego łączenia kilku gatunków.'],
    ['Gniazda', 'Gniazda zachowują się jako układy jaj, zagłębienia w osadzie albo konstrukcje z materiału roślinnego.', 'Rozmieszczenie jaj, struktura osadu i obecność powtarzalnych stanowisk pomagają rozpoznać strategię lęgową.', 'Nie każde skupisko jaj jest nienaruszonym gniazdem zachowanym dokładnie tak, jak je złożono.'],
    ['Jaja dinozaurów', 'Jaja różniły się wielkością, kształtem i mikrostrukturą skorupy, co bada dziedzina nazywana oologią.', 'Porowatość skorupy może wskazywać na wymianę gazową i warunki inkubacji w osadzie lub materiale roślinnym.', 'Bez zarodka trudno przypisać wiele jaj do konkretnego rodzaju dinozaura.'],
    ['Wysiadywanie', 'U niektórych maniraptorów znaleziono dorosłe osobniki bezpośrednio na układach jaj, co wspiera hipotezę wysiadywania.', 'Ułożenie kończyn i jaj porównuje się z zachowaniem lęgowym ptaków oraz z warunkami zachowania stanowiska.', 'Nie wiadomo, czy wszystkie dinozaury ogrzewały jaja własnym ciałem.'],
    ['Opieka nad młodymi', 'Kości młodych przy gniazdach, tempo wzrostu i organizacja kolonii mogą wskazywać na różne poziomy opieki rodzicielskiej.', 'Dobrze znane są przykłady związane z <em>Maiasaura</em>, lecz interpretacje są stale oceniane na tle tafonomii stanowiska.', 'Obecność młodych obok dorosłych nie zawsze dowodzi karmienia lub długiej opieki.'],
    ['Kolonie lęgowe', 'Powtarzalne gniazda w jednym miejscu sugerują, że wiele osobników korzystało z korzystnego obszaru rozrodczego.', 'Odstępy między gniazdami, warstwy osadu i wiek jaj pomagają badać organizację kolonii.', 'Kolonia nie musi oznaczać, że wszystkie osobniki były blisko spokrewnione lub stale społeczne.'],
    ['Jak szybko rosły młode?', 'Tempo wzrostu odczytuje się z mikroskopowej budowy kości, wielkości osobników i serii rozwojowych.', 'Linie zahamowanego wzrostu mogą rejestrować okresy spowolnienia, podobnie jak słoje w drewnie.', 'Rytm takich linii nie jest zawsze prostym kalendarzem rocznym.']
  ], [
    { q: 'Czym zajmuje się oologia?', options: ['Badaniem kopalnych jaj i ich skorupek', 'Badaniem pazurów', 'Badaniem tylko ptasich skrzydeł', 'Datowaniem meteorytów'], answer: 0, why: 'Oologia bada jaja, ich budowę i związane z nimi zachowania rozrodcze.' },
    { q: 'Co jest potrzebne, aby wiarygodnie wykazać dymorfizm płciowy?', options: ['Jeden wyjątkowy okaz', 'Duża seria porównywalnych osobników', 'Tylko kolor rekonstrukcji', 'Długi ogon'], answer: 1, why: 'Trzeba oddzielić różnice płci od wieku, zmienności i błędów klasyfikacji.' },
    { q: 'Co może sugerować porowatość skorupy jaja?', options: ['Dokładną barwę rodzica', 'Wiek dorosłego', 'Warunki wymiany gazowej podczas inkubacji', 'Długość migracji'], answer: 2, why: 'Pory w skorupie są związane z wymianą gazową rozwijającego się zarodka.' },
    { q: 'Jakie znalezisko szczególnie wspiera wysiadywanie?', options: ['Dorosły osobnik zachowany na układzie jaj', 'Pojedynczy ząb w rzece', 'Duży kamień obok gniazda', 'Odcisk liścia'], answer: 0, why: 'Taki układ może wskazywać, że dorosłe zwierzę przebywało na jajach.' },
    { q: 'Dlaczego skupisko jaj nie zawsze jest nienaruszonym gniazdem?', options: ['Jaja nie mogą się zachować', 'Osad i woda mogły przemieścić jaja po złożeniu', 'Dinozaury nie rozmnażały się z jaj', 'Wszystkie jaja były kuliste'], answer: 1, why: 'Procesy zachodzące po złożeniu jaj mogą zmienić ich pierwotne rozmieszczenie.' }
  ]);

  moduleData(19, 'Od jaja do olbrzyma', 'Jak rozwój, wzrost i długość życia dinozaurów zapisują się w jajach oraz kościach.', 'ontogeneza dinozaurów', [
    ['Rozwój zarodkowy', 'Zarodki zachowane w jajach pozwalają śledzić kolejność powstawania kości i zmiany proporcji ciała przed wykluciem.', 'Porównanie wielu zarodków oraz ich położenia w jajach pomaga odróżnić etap rozwoju od deformacji pośmiertnej.', 'Materiał zarodkowy jest rzadki i delikatny, dlatego interpretacje bywają aktualizowane.'],
    ['Wykluwanie', 'Wykluwanie wymagało przebicia skorupy i szybkiej adaptacji do warunków poza jajem, ale jego przebieg różnił się między liniami.', 'Mikrostruktura skorupy oraz rozwój kości u zarodków mogą dostarczyć informacji o gotowości młodych do ruchu.', 'Nie da się założyć, że wszystkie młode były od razu samodzielne albo całkowicie bezradne.'],
    ['Młode dinozaury', 'Młode często różniły się od dorosłych proporcjami głowy, kończyn i ornamentacją, co może utrudniać ich identyfikację.', 'Serie osobników różnego wieku oraz struktura kości pomagają połączyć etapy ontogenezy jednego gatunku.', 'Mały szkielet nie musi należeć do młodego znanego gatunku; może być dorosłym małego gatunku.'],
    ['Tempo wzrostu', 'Szybki albo wolniejszy wzrost bada się przez histologię kości, która rejestruje tempo odkładania tkanki kostnej.', 'Gęsto unaczyniona kość włóknisto-warstwowa często wiąże się z szybkim wzrostem, choć wymaga kontekstu.', 'Jedna próbka z kości nie opisuje całego życia ani całej populacji.'],
    ['Dojrzewanie', 'Dojrzewanie płciowe i pełna dojrzałość szkieletowa nie musiały następować w tym samym wieku.', 'Zmiany w histologii, zrosty kości i cechy rozrodcze pomagają rozdzielić etapy życia.', 'Duży rozmiar nie jest sam w sobie pewnym wskaźnikiem pełnej dojrzałości. U niektórych gatunków rozród mógł zacząć się przed pełnym wzrostem.'],
    ['Dorosłość', 'Dorosłe osobniki rozpoznaje się przez zestaw cech, takich jak zakończenie intensywnego wzrostu i przebudowa kości.', 'Porównuje się proporcje, powierzchnie stawowe oraz mikroskopową strukturę różnych kości.', 'Wiele gatunków znamy z nielicznych okazów, więc granice wieku mogą pozostać niepewne.'],
    ['Jak długo żyły dinozaury?', 'Przybliżony wiek można oceniać na podstawie linii wzrostu w kościach oraz modeli tempa wzrostu.', 'Należy uwzględnić, że część linii może się zatrzeć podczas przebudowy tkanki u starszego zwierzęcia.', 'Nie każda linia odpowiada dokładnie jednemu rokowi i nie każda kość zachowuje pełną historię.']
  ], [
    { q: 'Co bada ontogeneza?', options: ['Rozwój organizmu w ciągu życia', 'Ruch kontynentów', 'Wyłącznie dietę dorosłych', 'Rodzaje minerałów'], answer: 0, why: 'Ontogeneza opisuje zmiany od zarodka przez młodość po dorosłość.' },
    { q: 'Dlaczego mały szkielet nie zawsze oznacza młodego znanego gatunku?', options: ['Wszystkie dinozaury były wielkie', 'Może należeć do dorosłego małego gatunku', 'Kości nie rosną', 'Jaja są zawsze duże'], answer: 1, why: 'Wielkość trzeba interpretować razem z anatomią i cechami dojrzałości.' },
    { q: 'Co może wskazywać na szybkie tempo wzrostu?', options: ['Kolor zęba', 'Kształt jednego tropu', 'Gęsto unaczyniona tkanka kostna', 'Brak skały wokół kości'], answer: 2, why: 'Budowa mikroskopowa kości może rejestrować tempo jej odkładania.' },
    { q: 'Dlaczego wiek z linii wzrostu jest przybliżeniem?', options: ['Część linii może zostać zatarta podczas przebudowy kości', 'Linie nie istnieją', 'Młode nie miały kości', 'Każda kość ma ten sam wiek'], answer: 0, why: 'Przebudowa kostna u starszych osobników może usuwać najwcześniejsze zapisy wzrostu.' },
    { q: 'Które stwierdzenie o dojrzałości jest poprawne?', options: ['Dojrzałość płciowa zawsze następuje po zatrzymaniu wzrostu', 'Dojrzałość płciowa i szkieletowa mogły przypadać na różne etapy', 'Rozmiar nigdy nie ma znaczenia', 'Każdy młody miał ornamentację dorosłego'], answer: 1, why: 'U wielu zwierząt zdolność do rozrodu i pełna dojrzałość szkieletu nie są tym samym etapem.' }
  ]);

  moduleData(20, 'Dinozaury i ptaki', 'Dlaczego współczesne ptaki są żyjącą linią dinozaurów teropodów.', 'pochodzenie i ewolucja ptaków', [
    ['Które dinozaury były przodkami ptaków?', 'Ptaki wywodzą się z niewielkich pierzastych teropodów, a nie od wszystkich dinozaurów jako jednej nieokreślonej grupy.', 'Analizy cech szkieletu i piór umieszczają ptaki wewnątrz maniraptorów, czyli teropodów maniraptorańskich.', 'Nie oznacza to, że znany pojedynczy gatunek był bezpośrednim przodkiem wszystkich dzisiejszych ptaków.'],
    ['Archaeopteryx', '<em>Archaeopteryx</em> łączy cechy ptasie, takie jak pióra lotne, z cechami teropodów, w tym zębami i długim kostnym ogonem.', 'Jego późnojurajskie okazy są ważne dla historii poznania ewolucji ptaków, ale nie są „brakującym ogniwem” w prostym szeregu.', 'Ewolucja jest rozgałęziona, więc jeden okaz nie stanowi jedynego przejścia między dwiema grupami.'],
    ['Ewolucja piór', 'Pióra pojawiły się przed pełnym lotem i początkowo mogły służyć izolacji, pokazom, osłonie jaj albo komunikacji.', 'Skamieniałości wielu teropodów z filamentami i złożonymi piórami pokazują stopniowe różnicowanie struktur okrywowych.', 'Nie każde włókno zachowane przy szkielecie jest automatycznie piórem o znanej funkcji.'],
    ['Ewolucja lotu', 'Lot prawdopodobnie nie powstał w jednym skoku; badane są hipotezy związane z biegiem, wspinaniem i kontrolowanym szybowaniem.', 'Skrzydła, asymetria piór, obręcz barkowa i biomechanika pomagają ocenić zdolności aerodynamiczne.', 'Nie wszystkie pierzaste teropody potrafiły aktywnie latać. Część form wykorzystywała pióra bez opuszczania podłoża.'],
    ['Zmiany szkieletu', 'U ptasiej linii teropodów zmieniały się między innymi kończyny przednie, obręcz barkowa, ogon i układ oddechowy.', 'Furkula, półksiężycowata kość nadgarstka oraz pneumatyzacja kości tworzą zestaw cech badanych w analizach pokrewieństwa.', 'Żadna pojedyncza cecha nie definiuje samodzielnie całej historii powstania ptaków.'],
    ['Pierwsze ptaki', 'W mezozoiku żyło wiele wczesnych ptaków i ptasich dinozaurów o odmiennych kombinacjach cech, nie tylko <em>Archaeopteryx</em>.', 'Znaleziska z różnych kontynentów pokazują eksperymenty ewolucyjne z lotem, uzębieniem i ogonem.', 'Granica między „ptakiem” a bliskim ptasim teropodem zależy od użytej definicji naukowej.'],
    ['Dlaczego ptaki są dinozaurami?', 'Współczesna systematyka zalicza ptaki do Dinosauria, ponieważ wywodzą się z teropodów i dzielą z nimi odziedziczone cechy.', 'To podejście zachowuje grupy o wspólnym przodku i wszystkich jego potomkach.', 'Mówienie, że ptaki „pochodzą od dinozaurów”, jest uproszczeniem; ptaki są jedną z ich żyjących linii.'],
    ['Dinozaury, które żyją do dziś', 'Wszystkie współczesne ptaki, od wróbla po strusia, są żyjącymi dinozaurami z grupy teropodów.', 'Katastrofa na granicy kredy i paleogenu wyeliminowała nieptasie dinozaury, lecz część ptasiej linii przetrwała.', 'Nieptasie dinozaury nie ukrywają się dziś w odległych miejscach; ich żyjącymi potomkami są ptaki.']
  ], [
    { q: 'Do której grupy dinozaurów należą ptaki?', options: ['Teropodów', 'Zauropodów', 'Ankylozaurów', 'Pterozaurów'], answer: 0, why: 'Ptaki są wyspecjalizowaną, żyjącą linią teropodów.' },
    { q: 'Co pokazuje <em>Archaeopteryx</em>?', options: ['Że ptaki nie mają związku z teropodami', 'Kombinację cech ptasich i teropodowych', 'Że wszystkie dinozaury latały', 'Że pióra powstały po wymarciu dinozaurów'], answer: 1, why: 'Archaeopteryx zachowuje zarówno rozwinięte pióra, jak i liczne cechy teropodów.' },
    { q: 'Które zdanie o piórach jest prawdziwe?', options: ['Powstały wyłącznie do aktywnego lotu', 'Występowały tylko u dzisiejszych ptaków', 'Mogły pełnić funkcje przed powstaniem pełnego lotu', 'Nie występowały u teropodów'], answer: 2, why: 'Pióra miały różne możliwe funkcje zanim u części linii umożliwiły aktywny lot.' },
    { q: 'Dlaczego ptaki zalicza się do dinozaurów?', options: ['Wywodzą się z teropodów i są ich żyjącą linią', 'Mają zawsze wielkie rozmiary', 'Wszystkie składają identyczne jaja', 'Żyją tylko w lasach'], answer: 0, why: 'Klasyfikacja opiera się na wspólnym pochodzeniu i odziedziczonych cechach.' },
    { q: 'Które dinozaury przetrwały granicę kredy i paleogenu?', options: ['Wszystkie rogate', 'Część ptasiej linii', 'Pterozaury', 'Mozazaury'], answer: 1, why: 'Przetrwały niektóre ptasie dinozaury, od których pochodzą współczesne ptaki.' }
  ]);

  moduleData(21, 'Dinozaury świata', 'Jak położenie kontynentów, klimat i izolacja wpływały na rozmieszczenie dinozaurów.', 'paleobiogeografia dinozaurów', [
    ['Dinozaury Ameryki Północnej', 'Ameryka Północna dostarczyła wielu dobrze zbadanych późnokredowych stanowisk, lecz jej zapis nie reprezentuje całego świata dinozaurów.', 'Formacje takie jak Hell Creek pozwalają badać całe zespoły zwierząt i roślin w konkretnych przedziałach czasu.', 'Znane gatunki nie powinny być traktowane jako uniwersalny obraz wszystkich kontynentów.'],
    ['Dinozaury Ameryki Południowej', 'Ameryka Południowa zachowała bogate fauny, w tym wielkie zauropody i różnorodne teropody, rozwijające się w zmiennych warunkach Gondwany.', 'Nowe znaleziska i rewizje okazów stale zmieniają obraz pokrewieństw oraz rozmieszczenia tych zwierząt.', 'Brak znaleziska na mapie może wynikać z niedostatecznego rozpoznania skał, nie z rzeczywistego braku gatunku.'],
    ['Dinozaury Europy', 'Europa mezozoiczna była często archipelagiem, a izolacja wysp mogła wpływać na wielkość ciała oraz skład faun.', 'Warstwy z różnych basenów dostarczają danych o rogatych, iguanodontach i teropodach w odmiennych środowiskach.', 'Nie każda mała forma wyspowa jest przykładem karłowacenia; potrzebne są dane o wieku osobnika.'],
    ['Dinozaury Afryki', 'Afrykańskie stanowiska pokazują fauny od jury po kredę oraz złożone powiązania z innymi częściami Gondwany.', 'Analizuje się wiek warstw, paleogeografię i pokrewieństwo, aby rozróżnić wspólne pochodzenie od późniejszego rozprzestrzenienia.', 'Dzisiejsze granice państw nie odpowiadają dawnym kontynentom ani dawnym środowiskom.'],
    ['Dinozaury Azji', 'Azja dostarczyła wyjątkowych skamieniałości pierzastych dinozaurów, ceratopsów i wielu innych grup, szczególnie z Chin i Mongolii.', 'Drobnoziarniste osady mogą zachowywać pióra oraz szczegóły anatomii, które rzadko przetrwają gdzie indziej.', 'Dobre zachowanie w jednym regionie nie oznacza, że dane cechy występowały tylko tam.'],
    ['Dinozaury Australii', 'Dinozaury Australii żyły na wysokich szerokościach geograficznych Gondwany, w warunkach innych niż współczesny suchy kontynent.', 'Kości, tropy i osady pomagają odtworzyć sezonowość, roślinność oraz kontakty z Antarktydą.', 'Wysoka szerokość geograficzna nie oznacza automatycznie stałego mrozu. Sezonowość światła wymagała jednak szczególnych strategii życia.'],
    ['Dinozaury Antarktydy', 'Skamieniałości z Antarktydy dowodzą, że dinozaury żyły także w regionach polarnych, gdy klimat i położenie kontynentów były odmienne.', 'Badania uwzględniają drewno kopalne, osady i dane o długości dnia w dawnych szerokościach geograficznych.', 'Nie wiemy, czy każdy gatunek zimował na miejscu, migrował albo stosował inne strategie.'],
    ['Dlaczego na różnych kontynentach żyły różne gatunki?', 'Rozdzielanie się lądów, bariery morskie, klimat i czas ewolucyjny sprzyjały endemizmowi, czyli występowaniu gatunków ograniczonemu do regionu.', 'Paleobiogeografia łączy datowanie warstw, rekonstrukcje kontynentów, dane o paleoklimacie i analizy pokrewieństwa.', 'Podobne zwierzęta na dwóch kontynentach nie zawsze oznaczają bezpośrednią migrację między nimi.']
  ], [
    { q: 'Co bada paleobiogeografia?', options: ['Dawne rozmieszczenie organizmów', 'Wyłącznie pogodę dziś', 'Kolory piór', 'Tylko budowę zębów'], answer: 0, why: 'Paleobiogeografia analizuje, gdzie organizmy żyły w przeszłości i dlaczego.' },
    { q: 'Co mogło sprzyjać odmiennym faunom na kontynentach?', options: ['Identyczne bariery wszędzie', 'Izolacja lądów i różnice klimatu', 'Brak czasu ewolucyjnego', 'Współczesne granice państw'], answer: 1, why: 'Rozdzielenie kontynentów i różne środowiska ograniczały przepływ populacji.' },
    { q: 'Dlaczego dzisiejsze granice państw są słabym narzędziem dla mezozoiku?', options: ['Nie ma na nich skał', 'Dinozaury nie miały państw', 'Nie odpowiadają dawnym kontynentom i środowiskom', 'Wszystkie są pod wodą'], answer: 2, why: 'Geografia polityczna jest bardzo młoda w porównaniu z historią mezozoiku.' },
    { q: 'Co może utrudniać wniosek o braku gatunku w regionie?', options: ['Niedostateczne zbadanie odpowiednich skał', 'Zawsze znane wszystkie skamieniałości', 'Tylko wielkość kontynentu', 'Brak współczesnych ptaków'], answer: 0, why: 'Zapis kopalny jest niepełny i nierównomiernie badany.' },
    { q: 'Czym jest endemizm?', options: ['Wymarciem wszystkich gatunków', 'Ograniczonym występowaniem gatunku w określonym regionie', 'Rodzajem jaja', 'Sposobem lotu'], answer: 1, why: 'Gatunek endemiczny ma zasięg ograniczony do danego obszaru.' }
  ]);

  moduleData(22, 'Dinozaury Polski', 'Jakie ślady i szczątki dinozaurów znamy z terenów dzisiejszej Polski oraz jak je interpretujemy.', 'polskie stanowiska dinozaurów', [
    ['Czy w Polsce żyły dinozaury?', 'Na terenach dzisiejszej Polski żyły dinozaury w mezozoiku, choć znaleziska są mniej kompletne niż w niektórych słynnych regionach świata.', 'Dowodami są przede wszystkim tropy, pojedyncze kości i stanowiska zachowane w osadach odpowiedniego wieku.', 'Dzisiejsza Polska nie była stałym krajobrazem; jej obszar wielokrotnie zmieniał położenie i środowisko.'],
    ['Najważniejsze stanowiska', 'Istotne są między innymi stanowiska jurajskie i wczesnokredowe, gdzie odsłaniają się osady lądowe lub przybrzeżne z tropami oraz kośćmi.', 'Wartość stanowiska zależy od dokumentacji warstw, mapy znalezisk i możliwości zachowania materiału w zbiorach.', 'Nazwanie miejsca „dinozaurowym” nie znaczy, że zawiera ono kompletne szkielety wielu gatunków.'],
    ['Tropienia dinozaurów', 'Tropy są skamieniałościami śladowymi, które mówią o ruchu, liczbie palców, podłożu i czasem o kierunku marszu zwierzęcia.', 'Ichnotaksony opisują formę śladu, a nie muszą wskazywać dokładnego gatunku, który go pozostawił.', 'Podobny trop może zostać wykonany przez różne, blisko spokrewnione zwierzęta.'],
    ['Znaleziska z terenów Polski', 'Kości, zęby i tropy z Polski wymagają porównań z materiałem światowym oraz dokładnego rozpoznania wieku skał.', 'Często bezpieczniej przypisać okaz do szerszej grupy niż ogłaszać nowy, znany rodzaj na podstawie fragmentu.', 'Niewielki fragment kości może być naukowo cenny, ale jego możliwości identyfikacji są ograniczone.'],
    ['Jak wyglądała Polska w mezozoiku?', 'W mezozoiku obszar Polski obejmował w różnych okresach równiny, wybrzeża, płytkie morza i systemy rzeczne.', 'Skały osadowe, skamieniałości roślin i bezkręgowców oraz struktury sedymentacyjne pomagają odtworzyć te środowiska.', 'Nie można przenosić współczesnego klimatu i krajobrazu Polski wprost do jury albo kredy.']
  ], [
    { q: 'Jakie dowody dinozaurów są szczególnie ważne w Polsce?', options: ['Tropy, kości i zęby', 'Tylko współczesne ptaki', 'Wyłącznie legendy', 'Zdjęcia satelitarne bez skał'], answer: 0, why: 'Polskie dane obejmują między innymi skamieniałości śladowe oraz fragmentaryczne szczątki.' },
    { q: 'Co opisuje ichnotakson?', options: ['Dokładny gatunek sprawcy śladu', 'Formę śladu, niekoniecznie sprawcę', 'Wyłącznie wiek skały', 'Kolor podłoża'], answer: 1, why: 'Nazwy ichnotaksonów odnoszą się do śladów, ponieważ autor śladu zazwyczaj nie jest znany.' },
    { q: 'Dlaczego fragment kości często przypisuje się do szerokiej grupy?', options: ['Nie ma żadnej wartości', 'Jest zbyt nowy', 'Ma za mało cech do pewnego oznaczenia rodzaju', 'Nie jest zbudowany z minerałów'], answer: 2, why: 'Niewielki fragment może nie zachowywać cech diagnostycznych dla rodzaju lub gatunku.' },
    { q: 'Co pomaga odtworzyć środowisko mezozoicznej Polski?', options: ['Skały osadowe i skamieniałości różnych organizmów', 'Współczesna mapa drogowa', 'Tylko wysokość gór', 'Imiona odkrywców'], answer: 0, why: 'Osady i skamieniałości dostarczają informacji o dawnym środowisku.' },
    { q: 'Dlaczego nie wolno przenosić współczesnego krajobrazu Polski do jury?', options: ['Jura była zbyt krótka', 'Położenie lądów, klimat i środowiska były inne', 'Nie istniały rzeki', 'Dinozaury tworzyły współczesne miasta'], answer: 1, why: 'Obszar dzisiejszej Polski wielokrotnie zmieniał warunki geograficzne i klimatyczne.' }
  ]);

  moduleData(23, 'Ekosystemy ery dinozaurów', 'Jak różne środowiska lądowe i przybrzeżne kształtowały życie dinozaurów oraz innych organizmów.', 'mezozoiczne ekosystemy', [
    ['Lasy', 'Lasy mezozoiczne tworzyły głównie nagonasienne, paprocie i inne rośliny, a później także rośliny okrytonasienne.', 'Drewno kopalne, liście, pyłek i osady pomagają określić strukturę roślinności oraz jej zmiany w czasie.', 'Współczesny las liściasty nie jest prostym odpowiednikiem lasu jurajskiego lub kredowego.'],
    ['Równiny', 'Równiny zalewowe mogły dostarczać wody, roślin i otwartych przestrzeni, ale były też narażone na powodzie oraz susze.', 'Warstwy mułowców, piaskowców, gleby kopalne i tropy pomagają odtworzyć zmienność takiego krajobrazu.', 'Szeroka równina nie musiała być stale zielona ani stale sucha.'],
    ['Pustynie', 'Pustynie mezozoiczne obejmowały wydmy i okresowe zbiorniki wodne, a organizmy musiały radzić sobie z niedoborem wody i skrajnymi temperaturami.', 'Duże przekątne uławicenie piaskowców oraz ślady wiatru są ważnymi wskaźnikami środowiska eolicznego.', 'Znaleziska z pustyni nie dowodzą, że zwierzę żyło wyłącznie na nagich wydmach.'],
    ['Rzeki i jeziora', 'Systemy rzeczne i jeziorne gromadzą osady, szczątki oraz tropy, dlatego są częstymi źródłami danych o ekosystemach lądowych.', 'Kierunek warstw, rodzaj ziarna osadu i układ kości pomagają rozpoznać przepływ wody oraz transport szczątków.', 'Woda może selektywnie przenosić kości, zacierając pierwotny obraz społeczności.'],
    ['Wybrzeża', 'Wybrzeża łączyły środowiska lądowe i morskie, a poziom morza oraz sztormy silnie wpływały na zachowanie skamieniałości.', 'Osady pływowe, ślady fal i mieszane zespoły organizmów wskazują na zmienne warunki przybrzeżne.', 'Znalezienie kości dinozaura w osadzie morskim nie znaczy, że był on zwierzęciem morskim.'],
    ['Obszary polarne', 'W mezozoicznych regionach polarnych występowały długie okresy dnia i nocy, ale klimat był na ogół cieplejszy niż współcześnie.', 'Drewno kopalne, osady oraz dane paleogeograficzne pozwalają badać sezonowość i roślinność tych miejsc.', 'Pobyt w pobliżu bieguna nie oznacza automatycznie śnieżnego środowiska przez cały rok.'],
    ['Roślinność mezozoiku', 'Rośliny były podstawą większości lądowych sieci pokarmowych i zmieniały się znacząco w ciągu triasu, jury oraz kredy.', 'Pyłek, zarodniki, liście i drewno pozwalają rozpoznać rośliny dostępne dla roślinożerców.', 'Nie każdy roślinożerca żywił się najliczniejszą rośliną widoczną w zapisie kopalnym.'],
    ['Łańcuchy pokarmowe', 'Sieci pokarmowe obejmowały producentów, konsumentów i rozkładaczy, a dinozaury były tylko jedną częścią tych układów.', 'Ślady żerowania, koprolity oraz proporcje różnych skamieniałości pomagają rekonstruować relacje troficzne.', 'Prawdziwa sieć pokarmowa jest bardziej złożona niż prosty łańcuch z trzema ogniwami.']
  ], [
    { q: 'Jakie rośliny dominowały w wielu lasach mezozoicznych?', options: ['Nagonasienne i paprocie', 'Tylko trawy', 'Wyłącznie współczesne dęby', 'Żadne rośliny'], answer: 0, why: 'W wielu ekosystemach mezozoiku ważne były nagonasienne, paprocie i inne dawne grupy roślin.' },
    { q: 'Co może wskazywać na środowisko pustynne?', options: ['Skamieniałe muszle głębinowe', 'Przekątne uławicenie piaskowców', 'Brak osadów', 'Tylko wielkie kości'], answer: 1, why: 'Taka struktura warstw często powstaje w przemieszczanych przez wiatr wydmach.' },
    { q: 'Dlaczego kości w osadzie rzecznym wymagają ostrożności?', options: ['Rzeki nie tworzą osadów', 'Kości zawsze pozostają na miejscu śmierci', 'Woda mogła je przenieść i skoncentrować', 'Dinozaury nie piły wody'], answer: 2, why: 'Transport wodny może zmienić pierwotne rozmieszczenie szczątków.' },
    { q: 'Co oznacza kość dinozaura w osadzie morskim?', options: ['Nie dowodzi, że dinozaur żył w morzu', 'Dowodzi, że był mozazaurem', 'Wyklucza transport pośmiertny', 'Zawsze oznacza pływanie pod wodą'], answer: 0, why: 'Szczątki lądowe mogły być przeniesione do środowiska przybrzeżnego lub morskiego.' },
    { q: 'Które elementy należą do pełnej sieci pokarmowej?', options: ['Tylko drapieżniki', 'Producenci, konsumenci i rozkładacze', 'Tylko dinozaury', 'Wyłącznie rośliny'], answer: 1, why: 'Ekosystem obejmuje organizmy wytwarzające biomasę, korzystające z niej i rozkładające materię organiczną.' }
  ]);

  moduleData(24, 'Zwierzęta, które żyły obok dinozaurów', 'Poznaj inne grupy zwierząt mezozoiku i dowiedz się, dlaczego nie wszystkie są dinozaurami.', 'sąsiedzi dinozaurów w mezozoiku', [
    ['Pierwsze ssaki', 'Mezozoiczne ssaki były zróżnicowane i nie ograniczały się do małych, nocnych owadożerców, choć wiele z nich miało niewielkie rozmiary.', 'Zęby, żuchwy i rzadziej kompletne szkielety pokazują odmienne diety oraz sposoby poruszania się.', 'Nie należy przedstawiać wszystkich ówczesnych ssaków jako jednorodnej, nieistotnej grupy.'],
    ['Pterozaury', 'Pterozaury były latającymi archozaurami, ale nie były dinozaurami i miały własną, odrębną historię ewolucyjną.', 'Ich skrzydło było rozpięte głównie na silnie wydłużonym czwartym palcu, inaczej niż skrzydło ptaka.', 'Zdolność do lotu nie jest kryterium decydującym o przynależności do dinozaurów.'],
    ['Krokodylomorfy', 'Krokodylomorfy obejmowały znacznie większą różnorodność form niż dzisiejsze krokodyle, w tym gatunki lądowe i morskie.', 'Budowa czaszki, kończyn i zębów pokazuje przystosowania do różnych diet oraz środowisk.', 'Współczesny krokodyl nie jest dokładnym obrazem każdego mezozoicznego krokodylomorfa. Różne linie rozwijały też odmienne postawy i proporcje ciała.'],
    ['Żółwie', 'Żółwie miały już w mezozoiku charakterystyczny pancerz, a ich skamieniałości występują w wielu środowiskach wodnych i lądowych.', 'Pancerz, czaszka i kontekst osadowy pozwalają oceniać ich sposób życia oraz pokrewieństwo.', 'Żółwie są gadami, lecz nie należą do Dinosauria.'],
    ['Jaszczurki', 'Łuskonośne, obejmujące jaszczurki i węże, były ważną częścią mezozoicznych ekosystemów, choć często zachowują się fragmentarycznie.', 'Drobne kości czaszki i kręgi wymagają precyzyjnego badania pod mikroskopem oraz dobrego porównania anatomicznego.', 'Mały rozmiar znaleziska nie oznacza małego znaczenia ekologicznego.'],
    ['Płazy', 'Płazy, zwłaszcza salamandry i żaby w późniejszych okresach, dostarczają informacji o dostępności słodkiej wody i warunkach środowiska.', 'Ich delikatne kości zachowują się wybiórczo, dlatego brak znalezisk może być skutkiem zachowania, a nie braku zwierząt.', 'Obecność płazów nie mówi sama w sobie, że klimat był niezmiennie wilgotny przez cały rok.'],
    ['Owady', 'Owady zapylały część roślin, rozkładały materię, stanowiły pokarm i pozostawiały ślady żerowania na liściach.', 'Bursztyn, odciski ciał oraz uszkodzenia roślin są różnymi źródłami danych o ich różnorodności.', 'Brak dużego owada w ekspozycji nie oznacza, że owady były marginalne w ekosystemie.'],
    ['Zwierzęta morskie', 'Morza mezozoiku zamieszkiwały między innymi amonity, ryby, plezjozaury i mozazaury, tworząc odrębne sieci pokarmowe.', 'Szkielety, muszle i osady morskie pozwalają badać ich środowiska oraz wymierania.', 'Życie w tym samym czasie co dinozaury nie czyni zwierzęcia dinozaurem.'],
    ['Dlaczego pterozaury i mozazaury nie są dinozaurami?', 'Pterozaury oraz mozazaury należą do innych gałęzi gadów i nie mieszczą się wewnątrz Dinosauria.', 'Klasyfikacja wynika ze wspólnego pochodzenia i zestawu cech, a nie z wielkości, drapieżności czy popularności.', 'Pterozaur nie jest „latającym dinozaurem”, a mozazaur nie jest „morskim dinozaurem”.']
  ], [
    { q: 'Czy pterozaury były dinozaurami?', options: ['Nie, były odrębną linią latających archozaurów', 'Tak, ponieważ latały', 'Tak, ponieważ składały jaja', 'Nie, ponieważ były ssakami'], answer: 0, why: 'Pterozaury są bliskimi krewnymi dinozaurów wśród archozaurów, ale nie należą do Dinosauria.' },
    { q: 'Na którym palcu opierało się główne skrzydło pterozaura?', options: ['Pierwszym', 'Czwartym, silnie wydłużonym', 'Drugim', 'Piątym'], answer: 1, why: 'Błona skrzydłowa pterozaurów była podtrzymywana przede wszystkim przez wydłużony czwarty palec.' },
    { q: 'Które zwierzęta nie są dinozaurami mimo życia w mezozoiku?', options: ['Współczesne ptaki', 'Teropody', 'Mozazaury', 'Zauropody'], answer: 2, why: 'Mozazaury były morskimi łuskonośnymi, a nie dinozaurami.' },
    { q: 'Dlaczego mezozoiczne ssaki nie powinny być traktowane jako jedna prosta grupa?', options: ['Miały różne diety i sposoby życia', 'Nie miały kości', 'Żyły wyłącznie w morzu', 'Nie były kręgowcami'], answer: 0, why: 'Znane ssaki mezozoiczne wykazują większą różnorodność ekologiczną niż dawniej sądzono.' },
    { q: 'Na czym opiera się klasyfikacja pterozaurów i mozazaurów?', options: ['Na ich wielkości', 'Na wspólnym pochodzeniu i cechach', 'Na tym, czy są popularne', 'Na liczbie scen filmowych'], answer: 1, why: 'Systematyka odtwarza pokrewieństwo, a nie dzieli zwierząt według środowiska lub wyglądu.' }
  ]);
})();
// course-dino-3.js
(function () {
  window.COURSE_DINO = window.COURSE_DINO || { id: 'dino-all', modules: [] };
  var M = window.COURSE_DINO.modules;

  function shortDesc(txt) {
    var plain = String(txt).replace(/<[^>]+>/g, '');
    var cut = plain.split(/(?<=\.)\s/)[0] || plain;
    if (cut.length > 165) cut = cut.slice(0, 162).replace(/\s+\S*$/, '') + '…';
    return cut;
  }

  function esc(s) { return String(s); }
  function makeFigure(num, index, title) {
    return { caption: 'Rycina pomocnicza: ' + title + '.', alt: 'Ilustracja edukacyjna do lekcji „' + title + '” w module ' + num + '.' };
  }
  function makeLesson(num, index, data) {
    var title = data[0], lesson = {
      id: 'd' + num + '-l' + index,
      title: title,
      desc: shortDesc(data[1]),
      duration: 8 + ((num + index) % 7),
      body: [
        '<p><strong>' + esc(title) + '</strong> ' + data[1] + ' ' + data[2] + '</p>',
        '<h3>Jak oceniać dowody</h3>',
        '<p>W tym temacie warto oddzielać bezpośrednią obserwację od rekonstrukcji. Badacze porównują wiele okazów, ich wiek geologiczny, położenie w warstwie oraz podobieństwa do innych zwierząt. Pojedyncza kość, ilustracja albo medialny nagłówek rzadko wystarcza do mocnego wniosku. Najlepsza interpretacja wskazuje, jakie dane ją wspierają, jakie alternatywy pozostają możliwe i co musiałoby zostać odkryte, aby sprawę rozstrzygnąć.</p>',
        '<p>Porównuj informacje z kontekstem geologicznym oraz z opisem konkretnego okazu. Zastanów się, czy autor mówi o zachowanej strukturze, o pomiarze, czy o modelu opartym na kilku założeniach. W nauce warto sprawdzać, czy niezależne dane prowadzą do podobnego wniosku. Jeśli wyniki są rozbieżne, nie wybieraj automatycznie najbardziej efektownej wersji: sprawdź, skąd bierze się różnica metod, materiału albo definicji użytego pojęcia. Takie podejście pozwala samodzielnie ocenić jakość popularnego opracowania.</p>',
        '<ul><li><strong>Najważniejsza wskazówka:</strong> ' + data[3] + '</li><li><strong>Ostrożna interpretacja:</strong> ' + data[4] + '</li></ul>',
        '<blockquote>Dobra odpowiedź paleontologiczna łączy obserwację z uzasadnieniem i jasno zaznacza poziom pewności.</blockquote>'
      ]
    };
    if (index % 2) { lesson.figure = makeFigure(num, index, title); }
    return lesson;
  }
  function makeModule(raw) {
    var num = raw[0], lessons = [], i;
    for (i = 0; i < raw[3].length; i += 1) { lessons.push(makeLesson(num, i + 1, raw[3][i])); }
    return {
      id: 'd' + num,
      num: num,
      title: raw[1],
      summary: raw[2],
      figures: [
        { id: 'd' + num + '-f1', caption: 'Przegląd zagadnienia: ' + raw[1] + '.', alt: 'Schemat edukacyjny przedstawiający temat modułu ' + raw[1] + '.' },
        { id: 'd' + num + '-f2', caption: 'Dowody i porównania dla modułu ' + num + '.', alt: 'Ilustracja pokazująca, jak porównywać dane paleontologiczne w module ' + num + '.' }
      ],
      lessons: lessons,
      quiz: QUIZZES[num]
    };
  }
  var QUIZZES = {"25":[{"q":"Dlaczego masa największych zauropodów jest podawana jako oszacowanie?","options":["Kości nie zachowują masy tkanek miękkich","Wszystkie zauropody były identyczne","Masa nie zależy od wielkości","Nie znamy ich wieku"],"answer":0,"why":"Masę modeluje się na podstawie kości i założeń dotyczących objętości ciała."},{"q":"Który zapis jest najuczciwszy przy niepełnym szkielecie?","options":["Jedna pewna liczba","Przedział z metodą oszacowania","Rekord bez źródła","Porównanie z filmem"],"answer":1,"why":"Przedział i opis metody pokazują niepewność danych."},{"q":"Co zmniejszało masę szyi wielu zauropodów?","options":["Pneumatyczne kręgi","Brak kręgów","Rogi","Maczuga ogonowa"],"answer":0,"why":"Pneumatyzacja tworzyła w kościach przestrzenie związane z workami powietrznymi."},{"q":"Czym były rogi ceratopsydów za życia?","options":["Wyłącznie keratyną","Kostnym rdzeniem zwykle pokrytym keratyną","Zębami","Piórami"],"answer":1,"why":"Zachowana kość nie pokazuje całej keratynowej pochwy."},{"q":"Która odpowiedź najlepiej opisuje rekord paleontologiczny?","options":["Niezmienny fakt","Wniosek zależny od materiału i metody","Informacja tylko z internetu","Nazwa najpopularniejszego gatunku"],"answer":1,"why":"Rekordy mogą się zmieniać wraz z nowymi okazami i metodami."}],"26":[{"q":"Co jest głównym dowodem związku Chicxulub z granicą K–Pg?","options":["Zgodny wiek struktury i warstwy granicznej","Współczesne legendy","Długość nazw gatunków","Kolor skał"],"answer":0,"why":"Datowanie wiąże uderzenie z czasem masowego wymierania."},{"q":"Dlaczego ograniczenie światła było groźne?","options":["Przerwało fotosyntezę i sieci pokarmowe","Powiększyło rogi","Zamieniło wszystkie skały w bazalt","Utworzyło ptaki"],"answer":0,"why":"Produkcja pierwotna stanowi podstawę wielu ekosystemów."},{"q":"Jaką rolę mógł odegrać wulkanizm Dekanu?","options":["Nie miał żadnego wpływu","Mógł być dodatkowym stresorem klimatycznym","Stworzył krater Chicxulub","Zamienił ptaki w ssaki"],"answer":1,"why":"Erupcje uwalniały gazy, lecz impakt jest kluczowym impulsem kryzysu."},{"q":"Która grupa jest żyjącą linią dinozaurów?","options":["Pterozaury","Ptaki","Mozazaury","Krokodyle"],"answer":1,"why":"Ptaki są teropodowymi dinozaurami."},{"q":"Dlaczego małe zwierzęta mogły łatwiej przetrwać?","options":["Zawsze miały pióra","Miały często mniejsze potrzeby pokarmowe i elastyczniejszą dietę","Nie potrzebowały wody","Żyły wyłącznie w oceanach"],"answer":1,"why":"Małe ciało i elastyczna dieta mogły pomagać w okresie niedoboru."}],"27":[{"q":"Co oznacza „wzrost paproci” po granicy K–Pg?","options":["Szybką kolonizację zniszczonych terenów przez paprocie","Pojawienie się pierwszych dinozaurów","Zamianę paproci w drzewa iglaste","Brak zmian roślinności"],"answer":0,"why":"Zarodniki paproci bywają częste w zapisie bezpośrednio po katastrofie."},{"q":"Dlaczego odbudowa ekosystemu trwa dłużej niż pojawienie się pojedynczego gatunku?","options":["Wymaga odtworzenia wielu relacji pokarmowych","Skamieniałości nie mają wieku","Rośliny nie rosną","Ptaki nie rozmnażają się"],"answer":0,"why":"Ekosystem to sieć oddziałujących organizmów."},{"q":"Co wydarzyło się ze ssakami w paleogenie?","options":["Zniknęły całkowicie","Zwiększyły różnorodność i rozmiary","Stały się pterozaurami","Żyły tylko w morzu"],"answer":1,"why":"Po wymieraniu ssaki zajęły część dostępnych nisz."},{"q":"Czy ptaki pojawiły się dopiero po katastrofie?","options":["Tak","Nie, ocalałe linie istniały już wcześniej","Tylko w Europie","Tylko jako ssaki"],"answer":1,"why":"Ptaki są dinozaurami, a część ich linii przetrwała granicę."},{"q":"Jak należy interpretować brak skamieniałości w regionie?","options":["Jako pewny dowód braku zwierzęcia","Ostrożnie, bo może wynikać z braku odsłonięć lub badań","Jako dowód katastrofy","Jako dowód koloru zwierzęcia"],"answer":1,"why":"Zapis kopalny jest niepełny i nierównomierny."}],"28":[{"q":"Który rodzaj był niewielkim, opierzonym dromeozaurem z Mongolii?","options":["Velociraptor","Brachiosaurus","Triceratops","Ankylosaurus"],"answer":0,"why":"Velociraptor był znacznie mniejszy od filmowego wizerunku."},{"q":"Który rodzaj miał kostną maczugę ogonową?","options":["Parasaurolophus","Ankylosaurus","Allosaurus","Iguanodon"],"answer":1,"why":"Ankylosaurus miał usztywniony ogon zakończony maczugą."},{"q":"Z czym wiąże się grzebień Parasaurolophus?","options":["Komunikacją i kształtowaniem dźwięku","Lotem aktywnym","Oddychaniem pod wodą przez skrzela","Produkcją jadu"],"answer":0,"why":"Przewody nosowe w grzebieniu mogły działać jak rezonator."},{"q":"Który rodzaj miał wyjątkowo długie pazury, choć był teropodem prawdopodobnie roślinożernym?","options":["Therizinosaurus","Tyrannosaurus","Stegosaurus","Giganotosaurus"],"answer":0,"why":"Terizinozaury pokazują, że część teropodów miała dietę głównie roślinną."},{"q":"Co najlepiej opisuje Spinosaurus?","options":["Teropod związany ze środowiskiem wodnym","Pterozaur","Ssaki drapieżny","Dinozaur z maczugą ogonową"],"answer":0,"why":"Jego anatomia wskazuje na częste korzystanie z wody."}],"29":[{"q":"Która odpowiedź najlepiej opisuje dietę Tyrannosaurus rex?","options":["Wyłącznie polował","Wyłącznie jadł padlinę","Mógł polować i korzystać z padliny","Jadł tylko rośliny"],"answer":2,"why":"Duże drapieżniki często łączą obie strategie."},{"q":"Co może wyjaśniać funkcję kryz ceratopsów?","options":["Tylko jedna funkcja","Ochrona, mięśnie i sygnalizacja","Lot","Oddychanie skrzelami"],"answer":1,"why":"Złożona struktura mogła pełnić kilka funkcji."},{"q":"Czy nagromadzenie dromeozaurów przy ofierze dowodzi współpracy?","options":["Zawsze","Nigdy nie może być badane","Nie, może mieć różne wyjaśnienia","Tylko w filmie"],"answer":2,"why":"Wspólne miejsce nie jest automatycznie dowodem skoordynowanego polowania."},{"q":"Jak najczęściej rekonstruuje się dźwięki dinozaurów?","options":["Z zachowanych nagrań","Pośrednio przez anatomię i żyjących krewnych","Z koloru kości","Z gier"],"answer":1,"why":"Tkanki głosowe zachowują się bardzo rzadko."},{"q":"Co oznacza zmiana rekonstrukcji po nowym odkryciu?","options":["Porażkę nauki","Aktualizację wniosku na podstawie danych","Że skamieniałości znikają","Że filmy są zawsze poprawne"],"answer":1,"why":"Nauka zmienia modele, gdy pojawiają się lepsze dane."}],"30":[{"q":"Dlaczego dawne ilustracje dinozaurów często są nieprecyzyjne?","options":["Opierały się na ograniczonym materiale","Artyści nie znali kolorów","Dinozaury nie miały kości","Nie istniały muzea"],"answer":0,"why":"Wczesne rekonstrukcje powstawały z dużo mniejszej liczby okazów."},{"q":"Co należy zrobić, oglądając dinozaura w filmie?","options":["Uznać wszystko za dane naukowe","Oddzielić decyzje narracyjne od dowodów","Ignorować nazwę","Nie oglądać filmu"],"answer":1,"why":"Film może popularyzować naukę, ale nie jest automatycznie źródłem pierwotnym."},{"q":"Które zwierzę nie jest dinozaurem?","options":["Ptak","Teropod","Pterozaur","Zauropod"],"answer":2,"why":"Pterozaury są odrębną grupą archozaurów."},{"q":"Co w grze może być fikcyjne mimo prawdziwej nazwy gatunku?","options":["Mechanika ruchu i zdolności","Nazwa naukowa","Istnienie muzeów","Wiek Ziemi"],"answer":0,"why":"Mechanika rozgrywki jest projektowana dla zabawy."},{"q":"Która cecha współczesnych obrazów dinozaurów jest często trafna?","options":["Związek ptaków z teropodami","Wszystkie są łuskowate","Ludzie żyli obok nich","Pterozaury są dinozaurami"],"answer":0,"why":"Ptaki należą do dinozaurów teropodów."}],"31":[{"q":"Co można odczytać z uzębienia?","options":["Informacje o pobieraniu i przetwarzaniu pokarmu","Dokładny kolor skóry","Imię odkrywcy","Pewną maksymalną prędkość"],"answer":0,"why":"Zęby są ważne dla wniosków o diecie."},{"q":"Która grupa była zwykle dwunożna?","options":["Wiele teropodów","Wszystkie zauropody","Wszystkie ankylozaury","Żadne dinozaury"],"answer":0,"why":"Teropody poruszały się na tylnych kończynach."},{"q":"Co charakteryzuje ptasiomiedniczne w uproszczonym opisie?","options":["Kość łonowa zwykle skierowana ku tyłowi","Brak miednicy","Pióra tylko na ogonie","Życie w morzu"],"answer":0,"why":"To jedna z cech miednicy tej dużej grupy."},{"q":"Z czym kojarzy się pancerz z osteoderm?","options":["Ankylozaurami","Hadrozaurami","Pterozaurami","Ptakami"],"answer":0,"why":"Osteodermy tworzyły pancerz wielu ankylozaurów."},{"q":"Jaka jest dobra pierwsza odpowiedź przy niepewnym fragmencie?","options":["Pewna nazwa gatunku","Opis cech i poziom pewności","Nazwa z filmu","Losowe porównanie"],"answer":1,"why":"Opis poprzedza ostrożną identyfikację."}],"32":[{"q":"Co opisuje etymologia nazwy?","options":["Jej znaczenie językowe","Pełną diagnozę gatunku","Masę zwierzęcia","Kolor skóry"],"answer":0,"why":"Znaczenie nazwy nie zastępuje cech diagnostycznych."},{"q":"Dlaczego „późna kreda” nie wystarcza do dokładnego porównania?","options":["Obejmuje miliony lat","Nie zawiera skał","Jest współczesna","Dotyczy tylko ptaków"],"answer":0,"why":"W obrębie jednego okresu zwierzęta mogły żyć daleko od siebie w czasie."},{"q":"Jak najlepiej podawać masę dinozaura?","options":["Z metodą i przedziałem błędu","Co do kilograma bez źródła","Tylko jako rekord","W ogóle nie podawać"],"answer":0,"why":"Masa jest wynikiem modelowania i ma niepewność."},{"q":"Co jest bezpośrednim dowodem zachowania?","options":["Trop lub gniazdo w kontekście","Dowolna ilustracja","Kolor mapy","Nazwa łacińska"],"answer":0,"why":"Ślady aktywności mogą dokumentować konkretne zachowanie."},{"q":"Czym jest holotyp?","options":["Okaz stanowiący podstawę nazwy taksonu","Największy osobnik","Każda replika w sklepie","Rodzaj skały"],"answer":0,"why":"Holotyp jest materiałem odniesienia przy ustanowieniu nazwy."}],"33":[{"q":"Czy wszystkie dinozaury były duże?","options":["Tak","Nie, wiele było małych","Tylko ptaki","Tylko zauropody"],"answer":1,"why":"Dinozaury obejmowały szeroki zakres rozmiarów."},{"q":"Które dinozaury przetrwały do dziś?","options":["Ptaki","Pterozaury","Mozazaury","Wszystkie nieptasie teropody"],"answer":0,"why":"Ptaki są żyjącą linią dinozaurów."},{"q":"Czy ludzie spotkali żywego Triceratops?","options":["Tak","Nie, dzieli ich dziesiątki milionów lat","Tylko w Azji","Tylko zimą"],"answer":1,"why":"Nieptasie dinozaury wymarły długo przed pojawieniem się ludzi."},{"q":"Która cecha Velociraptor jest poprawna?","options":["Był opierzony i nieduży","Miał 6 metrów wysokości","Był pterozaurem","Żył z ludźmi"],"answer":0,"why":"Znaleziska wskazują na pióra i niewielki rozmiar."},{"q":"Czy T. rex widział tylko ruch?","options":["Tak","Nie, to filmowy mit","Tylko w nocy","Tylko przez jedno oko"],"answer":1,"why":"Anatomia czaszki wskazuje na dobre widzenie obuoczne."}],"34":[{"q":"Jaka cecha najlepiej identyfikuje dużą grupę?","options":["Zestaw kilku cech","Kolor ilustracji","Popularność nazwy","Jedna scena filmowa"],"answer":0,"why":"Identyfikacja wymaga kombinacji cech i kontekstu."},{"q":"Jak zapisuje się pełną nazwę gatunku?","options":["<em>Tyrannosaurus rex</em>","tyrannosaurus Rex","TYRANNOSAURUS REX","Tyrannosaurus Rex"],"answer":0,"why":"Nazwa rodzaju ma wielką literę, gatunku małą, a obie są kursywą."},{"q":"Co oznacza węzeł na drzewie ewolucyjnym?","options":["Wspólnego przodka","Koniec czasu geologicznego","Pewną masę","Miejsce znaleziska"],"answer":0,"why":"Węzeł łączy gałęzie przez wspólnego przodka."},{"q":"Które zdanie jest hipotezą?","options":["Kość leży w warstwie","Zwierzę miało konkretny kolor","Okaz ma trzy palce","Skała jest piaskowcem"],"answer":1,"why":"Kolor jest często rekonstrukcją, nie bezpośrednią obserwacją."},{"q":"Co wzmacnia wiarygodność informacji?","options":["Źródło i możliwość sprawdzenia danych","Wiele udostępnień","Efektowny obraz","Pewny ton"],"answer":0,"why":"Dane powinny dać się prześledzić do źródła."},{"q":"Która grupa jest dinozaurami?","options":["Ptaki","Pterozaury","Mozazaury","Dimetrodon"],"answer":0,"why":"Ptaki należą do teropodowych dinozaurów."},{"q":"Dlaczego masa dinozaura ma zwykle przedział?","options":["Jest modelowana z niepełnych danych","Dinozaury nie miały masy","Wszystkie ważyły tyle samo","Kości są plastikowe"],"answer":0,"why":"Szacunki zależą od zachowanego materiału i założeń modelu."},{"q":"Co było głównym impulsem wymierania K–Pg?","options":["Uderzenie związane z Chicxulub","Pojawienie się ludzi","Powstanie ptaków","Jedna susza lokalna"],"answer":0,"why":"Impakt Chicxulub zbiegł się z globalnym kryzysem na granicy K–Pg."},{"q":"Jak postąpić z sensacyjnym nagłówkiem?","options":["Sprawdzić publikację, autora i dane","Natychmiast go powtórzyć","Uznać za fakt","Zignorować wszystkie badania"],"answer":0,"why":"Weryfikacja źródła pozwala oddzielić informację od sensacji."},{"q":"Co jest najlepszą odpowiedzią przy braku danych?","options":["Wskazać niepewność i potrzebne dowody","Wymyślić szczegół","Powtórzyć mit","Wybrać najpopularniejszą wersję"],"answer":0,"why":"Uczciwe wskazanie granic wiedzy jest elementem dobrej nauki."}]};
  var RAW = [[25,"Największe, najmniejsze i najbardziej niezwykłe dinozaury","Porównujemy rekordy z zachowaniem ostrożności, bo skamieniałości największych zwierząt są często niekompletne.",[["Największy dinozaur","Największymi znanymi dinozaurami były zauropody z późnej kredy Ameryki Południowej, między innymi <em>Patagotitan mayorum</em> i prawdopodobnie jeszcze większy <em>Argentinosaurus</em>.","Masa jest obliczana z obwodów kości kończyn, objętości sylwetki i porównań z lepiej zachowanymi okazami, a nie ważona bezpośrednio.","Kompletność szkieletu i metoda oszacowania masy.","Rekord może się zmienić po odkryciu bardziej kompletnego okazu."],["Największy drapieżnik","Wśród wielkich drapieżników długością mógł wyróżniać się <em>Spinosaurus aegyptiacus</em>, a masą i potężną głową <em>Tyrannosaurus rex</em>.","Porównanie jest trudne, ponieważ zwierzęta miały odmienne proporcje i żyły w innych ekosystemach; „największy” może znaczyć długość, masę albo wysokość.","Czy porównywana jest długość, masa czy wysokość bioder.","Nie należy mieszać rekonstrukcji z różnych, niepełnych osobników."],["Najmniejsze dinozaury","Najmniejsze nieptasie dinozaury były często niewielkimi teropodami, a najmniejszymi żyjącymi dinozaurami są współczesne ptaki, na przykład kolibry.","Wielkość dorosłego osobnika trzeba oddzielić od wielkości młodego zwierzęcia; mała kość nie zawsze oznacza mały gatunek.","Stopień zrośnięcia kości i inne wskaźniki dojrzałości.","Wiek osobnika może całkowicie zmienić interpretację rozmiaru."],["Najdłuższe szyje","Zauropody, takie jak <em>Diplodocus</em> i <em>Supersaurus</em>, miały bardzo wydłużone szyje z wielu kręgów szyjnych i lekką, pneumatyczną budową kości.","Długa szyja pomagała sięgać po pokarm na dużym obszarze bez przemieszczania całego ciała, lecz nie dowodzi automatycznie żerowania na najwyższych gałęziach.","Liczba kręgów, ich długość i ślady pneumatyzacji.","Zakres ruchu szyi rekonstruuje się z kości, nie z zachowanych mięśni."],["Największe rogi","Najbardziej okazałe rogi i kryzy miały ceratopsydy, zwłaszcza późnokredowe rodzaje takie jak <em>Triceratops</em> i <em>Torosaurus</em>.","Rogi były kostnymi rdzeniami pokrytymi za życia keratynową pochwą, dlatego sama kość nie pokazuje pełnego kształtu widocznego u zwierzęcia.","Kształt rdzenia rogowego, kryzy i ślady naczyń.","Nie można rozstrzygnąć funkcji rogu wyłącznie na podstawie jego wielkości."],["Najdziwniejsze czaszki","Niektóre czaszki łączyły nietypowe przystosowania: grzebień <em>Parasaurolophus</em>, kopułę pachycefalozaurów czy długi pysk <em>Spinosaurus</em>.","Czaszka jest złożoną konstrukcją; jej kształt może wiązać się z dietą, sygnalizacją, zmysłami lub rozwojem osobniczym.","Położenie zębów, jam nosowych i miejsc przyczepu mięśni.","Jedna cecha czaszki zwykle dopuszcza kilka funkcjonalnych wyjaśnień."],["Najbardziej nietypowe adaptacje","Dinozaury eksperymentowały z piórami, pancerzem, długimi pazurami, bezzębnymi dziobami i różnymi sposobami poruszania się.","Adaptacja nie jest „celem” ewolucji, lecz cechą, która mogła zwiększać powodzenie w konkretnym środowisku i przy określonym trybie życia.","Związek budowy z biomechaniką i środowiskiem.","Podobna cecha może powstać niezależnie w różnych liniach."],["Rekordy, których nadal nie jesteśmy pewni","Nagłówki o rekordach bywają atrakcyjne, lecz wiele nazw opiera się na fragmentarycznym materiale albo dawnych oszacowaniach.","Dobry rekord powinien podawać, czy dotyczy pojedynczego osobnika, średniej dla gatunku, długości czy masy oraz jaką metodą go wyliczono.","Źródło danych, zachowane kości i zakres błędu.","Najuczciwszą odpowiedzią na pytanie o rekord bywa przedział, a nie jedna liczba."]]],[26,"Wielkie wymieranie","Analizujemy granicę kreda–paleogen i połączone skutki uderzenia planetoidy, zmian klimatu oraz wulkanizmu.",[["Co wydarzyło się 66 milionów lat temu?","Około 66 milionów lat temu na granicy kredy i paleogenu wymarły wszystkie nieptasie dinozaury oraz liczne grupy morskie i lądowe.","Nie było to zwykłe „zniknięcie dinozaurów”, lecz szybki w skali geologicznej kryzys całych sieci pokarmowych.","Zmiany składu skamieniałości i warstwa graniczna K–Pg.","Czas trwania poszczególnych skutków nie był jednakowy w każdym środowisku."],["Asteroida Chicxulub","Główną przyczyną kryzysu było uderzenie dużego ciała kosmicznego w rejonie dzisiejszego półwyspu Jukatan, tworzące strukturę Chicxulub.","Energia zderzenia wyrzuciła materiał wysoko do atmosfery i uruchomiła globalne procesy, których skala przewyższała lokalne skutki samego krateru.","Wiek struktury i zgodność z granicą K–Pg.","Uderzenie nie wyklucza współudziału innych stresorów środowiskowych."],["Krater uderzeniowy","Krater Chicxulub ma około 180 kilometrów średnicy i jest dziś częściowo ukryty pod osadami północnego Jukatanu.","O jego impaktowym pochodzeniu świadczą geofizyka, pierścień struktur pod powierzchnią oraz skały przeobrażone pod ogromnym ciśnieniem.","Rozmieszczenie anomalii geofizycznych i skał szokowych.","Współczesny zarys na mapie nie odpowiada pierwotnemu reliefowi krateru."],["Bezpośrednie skutki uderzenia","W pobliżu miejsca upadku wystąpiły fale sejsmiczne, pożary, tsunami i opad gorącego materiału, a dalej rozeszły się pyły i aerozole.","Najważniejsze dla globalnego wymierania były zaburzenia atmosfery i produkcji pierwotnej, nie tylko zniszczenie terenów blisko krateru.","Warstwy z wyrzutami, tsunami i sadzą w odpowiednim wieku.","Skala pożarów na całej planecie pozostaje przedmiotem badań."],["Zmiany klimatu","Pył, sadza i związki siarki mogły ograniczyć dopływ światła słonecznego, ochłodzić powierzchnię i zakłócić fotosyntezę.","Po początkowym zaciemnieniu następowały też skutki długofalowe, w tym zmiany chemii oceanów i odbudowy roślinności.","Modele klimatyczne łączone z zapisem osadowym i izotopowym.","Dokładna siła oraz czas „zimy impaktowej” zależą od założeń modeli."],["Wulkanizm Dekanu","W Indiach pod koniec kredy trwały ogromne erupcje bazaltów Dekanu, które uwalniały gazy cieplarniane i aerozole.","Wulkanizm mógł obciążać ekosystemy przed i po uderzeniu, lecz najlepsze dane wskazują, że impakt był kluczowym impulsem masowego wymierania.","Datowanie erupcji oraz zapisy zmian klimatu i chemii oceanów.","Nie należy przedstawiać wulkanizmu i impaktu jako prostych, wzajemnie wykluczających się wyjaśnień."],["Dlaczego jedne zwierzęta wymarły, a inne przetrwały?","Przetrwanie zależało od wielkości ciała, diety, tempa rozmnażania, schronienia i możliwości korzystania z zasobów po załamaniu roślinności.","Małe zwierzęta o elastycznej diecie i zdolności ukrywania się mogły łatwiej przetrwać okres niedoboru światła oraz pokarmu.","Wielkość ciała, dieta i środowisko każdej grupy.","Nie istnieje jedna cecha, która tłumaczy przetrwanie wszystkich linii."],["Dlaczego przetrwały ptaki?","Ptaki są jedyną żyjącą linią dinozaurów; przetrwały tylko niektóre ich gałęzie, prawdopodobnie głównie małe formy związane z ziemią i nasionami.","Nasiona mogły być ważnym, dostępnym po katastrofie źródłem energii, a małe ciało zmniejszało dzienne zapotrzebowanie pokarmowe.","Pokrewieństwo ptaków z teropodami i zapis wczesnego paleogenu.","Nie wiemy dokładnie, które cechy przesądziły o ocaleniu każdej linii ptaków."]]],[27,"Świat po dinozaurach","Śledzimy odbudowę życia po granicy K–Pg bez sugestii, że wszystkie ekosystemy odzyskały równowagę od razu.",[["Pierwsze lata po katastrofie","W pierwszych latach po katastrofie krajobrazy były ubogie w roślinność, a wiele łańcuchów pokarmowych zostało przerwanych.","W zapisie kopalnym części obszarów widoczny jest krótki wzrost paproci, roślin zdolnych szybko zasiedlać zniszczone podłoże.","Skład pyłku i zarodników tuż nad granicą K–Pg.","Zapis roślin nie jest jednakowy na wszystkich kontynentach."],["Odbudowa ekosystemów","Ekosystemy odbudowywały się etapami: najpierw pojawiały się organizmy odporne i szybko rozmnażające się, a później bardziej złożone zespoły.","Powrót lasów, dużych roślinożerców i drapieżników wymagał odtworzenia wielu powiązań, nie tylko wzrostu liczby gatunków.","Zmiany różnorodności w kolejnych warstwach paleocenu.","Bogatsza fauna nie zawsze oznacza pełne odtworzenie dawnych funkcji ekosystemu."],["Rozwój ssaków","Po wymieraniu ssaki szybko zwiększały różnorodność i rozmiary, zajmując część nisz pozostawionych przez wymarłe grupy.","Nie oznacza to, że przed katastrofą były nieistotne: już w kredzie istniały liczne małe, wyspecjalizowane ssaki.","Rozmiary ciała, uzębienie i różnorodność kopalnych ssaków.","Rozkwit ssaków był zróżnicowany regionalnie i nie nastąpił jednego dnia."],["Los ocalałych ptaków","Ocalałe ptaki różnicowały się w paleogenie, dając początek wielu współczesnym liniom, ale ich wczesna historia jest częściowo niejasna.","Skamieniałości i analizy pokrewieństwa wskazują, że część głównych gałęzi ptaków istniała już blisko granicy K–Pg.","Cechy szkieletu, datowanie skamieniałości i porównania genetyczne żyjących ptaków.","Daty rozdzielenia linii zależą od zastosowanej metody i kalibracji."],["Jak zmieniła się Ziemia?","Po katastrofie zmieniły się składy lasów, zespoły zwierząt oraz obieg węgla w oceanach i na lądzie.","Paleogen nie był prostym powrotem do kredy; powstały nowe ekosystemy, w których ptaki i ssaki odgrywały coraz większą rolę.","Porównanie osadów, pyłków i faun po obu stronach granicy.","Zmiana środowiska ma wiele przyczyn, dlatego nie każdą przypisuje się samemu impaktowi."]]],[28,"Najsłynniejsze dinozaury","Każdy rozpoznawalny rodzaj warto oceniać według znanych okazów, środowiska i cech, a nie jedynie filmowego wizerunku.",[["Tyrannosaurus","<em>Tyrannosaurus rex</em> był dużym teropodem z późnej kredy Ameryki Północnej, o głębokiej czaszce i wyjątkowo mocnym zgryzie.","Miał zredukowane, lecz funkcjonalne przednie kończyny i prawdopodobnie polował, a także korzystał z padliny, jak współczesne duże drapieżniki.","Zęby, ślady ugryzień i liczne, dobrze zachowane szkielety.","Zachowania nie da się ustalić z jednej kości ani z jednego śladu."],["Triceratops","<em>Triceratops</em> był ceratopsydem z późnej kredy, rozpoznawalnym po trzech rogach i dużej kryzie kostnej.","Jego dziób i bateria zębowa służyły do przetwarzania twardego pokarmu roślinnego, a rogi mogły mieć kilka funkcji.","Czaszki o różnym wieku i sposób zużycia zębów.","Nie każdy ślad uszkodzenia rogu dowodzi walki między osobnikami."],["Velociraptor","<em>Velociraptor</em> był niewielkim, opierzonym dromeozaurem z późnej kredy Mongolii, znacznie mniejszym od ekranowych przedstawień.","Na drugiej stopie miał powiększony pazur, a jego przednie kończyny nosiły pióra, co potwierdzają miejsca przyczepu piór na kości łokciowej.","Wielkość szkieletu i guzki łokciowe.","Nie należy przenosić na ten rodzaj zachowania większych krewnych bez dowodów."],["Stegosaurus","<em>Stegosaurus</em> był późnojurajskim roślinożercą z rzędami dużych płyt na grzbiecie i kolcami na ogonie.","Płyty były silnie unaczynione i mogły służyć sygnalizacji lub termoregulacji, natomiast ogon stanowił skuteczną broń obronną.","Rozmieszczenie płyt, ich kanały naczyniowe i urazy drapieżników.","Dokładny układ płyt na żywym zwierzęciu jest rekonstruowany z ograniczonego materiału."],["Brachiosaurus","<em>Brachiosaurus</em> był zauropodem o przednich kończynach dłuższych niż tylne, co nadawało mu wysoką sylwetkę.","Pneumatyczne kręgi zmniejszały masę szyi, ale nie oznaczają, że zwierzę stale żerowało na najwyższych gałęziach.","Proporcje kończyn, kręgi szyjne i odciski worków powietrznych.","Pozycja szyi zależała również od tkanek miękkich i biomechaniki."],["Diplodocus","<em>Diplodocus</em> był smukłym zauropodem z bardzo długą szyją i ogonem oraz wąskimi zębami z przodu pyska.","Jego czaszka i uzębienie sugerują sposób pobierania roślin inny niż u wielu innych zauropodów.","Rozmieszczenie zębów, budowa szczęk i proporcje kręgów.","Sama długość ogona nie rozstrzyga, czy mógł działać jak bicz."],["Spinosaurus","<em>Spinosaurus aegyptiacus</em> był wielkim teropodem o wydłużonym pysku, stożkowatych zębach i wysokim żaglu na grzbiecie.","Cechy kości i ogona wskazują na częste korzystanie ze środowiska wodnego, lecz zakres jego pływania i polowania nadal jest dyskutowany.","Proporcje ogona, gęstość kości i porównania z innymi zwierzętami.","Nowe znaleziska mogą znacząco zmieniać rekonstrukcję tego fragmentarycznego rodzaju."],["Allosaurus","<em>Allosaurus</em> był dużym teropodem z późnej jury Ameryki Północnej, dobrze znanym z bogatych stanowisk formacji Morrison.","Miał ząbkowane zęby i silne kończyny tylne; ślady urazów pokazują, że prowadził aktywne, ryzykowne życie.","Szkielety z różnymi patologiami i budowę czaszki.","Uraz nie dokumentuje sam w sobie konkretnego sposobu polowania."],["Ankylosaurus","<em>Ankylosaurus</em> był późnokredowym roślinożercą pokrytym osteodermami i wyposażonym w masywną maczugę ogonową.","Pancerz chronił grzbiet i boki ciała, a usztywniony koniec ogona prawdopodobnie pozwalał na silne uderzenia.","Osteodermy, zrośnięte kręgi ogonowe i budowę maczugi.","Nie wiadomo, jak często maczuga służyła do obrony, a jak do rywalizacji."],["Parasaurolophus","<em>Parasaurolophus</em> był hadrozaurem z długim, rurkowatym grzebieniem wyrastającym z czaszki.","Modele i anatomia jam nosowych wskazują, że grzebień mógł uczestniczyć w komunikacji i kształtowaniu dźwięku.","Przebieg przewodów nosowych i porównanie osobników.","Grzebień nie był „trąbą”; nie znamy pełnego repertuaru odgłosów."],["Carnotaurus","<em>Carnotaurus sastrei</em> był południowoamerykańskim abelizaurydem o krótkiej czaszce, dwóch rogach nad oczami i bardzo małych przednich kończynach.","Długie kończyny tylne sugerują sprawne poruszanie się, a odkryte odciski skóry dostarczają rzadkich danych o pokryciu ciała.","Proporcje kończyn, czaszka i odciski skóry.","Szybkości biegu nie można odczytać bezpośrednio z długości nóg."],["Deinonychus","<em>Deinonychus antirrhopus</em> był dromeozaurem z wczesnej kredy, którego odkrycie wpłynęło na obraz aktywnych, ptakopodobnych teropodów.","Miał powiększony pazur stopy oraz sztywny ogon wspomagający równowagę podczas szybkich zwrotów.","Budowę stopy, ogona i miejsca przyczepu mięśni.","Dowody na zachowanie grupowe są słabsze niż sama obecność kilku kości obok siebie."],["Giganotosaurus","<em>Giganotosaurus carolinii</em> był wielkim karcharodontozaurydem z późnej kredy Argentyny, blisko spokrewnionym z innymi dużymi teropodami Gondwany.","Jego wydłużona czaszka i ząbkowane zęby wskazują na drapieżny tryb życia w ekosystemie z ogromnymi zauropodami.","Anatomia czaszki, zębów i warstwa geologiczna znaleziska.","Porównania masy z <em>Tyrannosaurus</em> zależą od przyjętych modeli sylwetki."],["Therizinosaurus","<em>Therizinosaurus cheloniformis</em> był wielkim terizinozaurem o niezwykle długich pazurach przednich kończyn i bezzębnym dziobie.","Choć należał do teropodów, prawdopodobnie jadł głównie rośliny; to przykład, że pokrewieństwo nie wyznacza prostej diety.","Kształt dzioba, szyi, brzucha i pazurów.","Funkcja pazurów mogła obejmować obronę, żerowanie i sygnalizację."],["Iguanodon","<em>Iguanodon</em> był dużym ornitopodem z wczesnej kredy Europy, znanym z kciuka przekształconego w kolec.","Dawne rekonstrukcje umieszczały ten kolec na nosie, lecz kompletne szkielety wykazały jego właściwe położenie na dłoni.","Ułożenie kości dłoni w zachowanych szkieletach.","Historia tego błędu przypomina, że interpretacje zmieniają się wraz z nowymi okazami."]]],[29,"Dinozaurze zagadki i naukowe spory","Uczymy się, dlaczego spór naukowy jest normalnym etapem pracy z niepełnym materiałem, a nie dowodem niewiedzy.",[["Czy T. rex był łowcą czy padlinożercą?","<em>Tyrannosaurus rex</em> miał zmysły i budowę odpowiednią do aktywnego polowania, lecz zapewne korzystał także z padliny.","W ekologii duży drapieżnik nie musi wybierać jednej strategii; współczesne zwierzęta często polują i padlinożerują zależnie od okazji.","Ślady zagojonych ugryzień, biomechanika zgryzu i rozmieszczenie zębów.","Nie da się obronić tezy, że był wyłącznie łowcą albo wyłącznie padlinożercą."],["Do czego służyły kryzy ceratopsów?","Kryzy ceratopsów mogły jednocześnie chronić szyję, wspierać mięśnie i służyć do rozpoznawania gatunku lub sygnalizacji.","Różnorodność ich kształtów oraz zmiany z wiekiem wskazują, że jedna prosta funkcja nie wyjaśnia całej budowy.","Rozmiar okien w kryzie, unaczynienie i ontogenezę.","Podobieństwo do współczesnych rogów jest wskazówką, nie bezpośrednim dowodem."],["Po co stegozaurom płyty?","Płyty stegozaurów były cienkie, silnie unaczynione i ustawione wzdłuż grzbietu, prawdopodobnie w dwóch naprzemiennych rzędach.","Najsilniej wspierane są funkcje wystawiania sygnałów i rozpoznawania, a wymiana ciepła mogła być skutkiem dodatkowym.","Mikrostrukturę płyt i ich rozmieszczenie na szkieletach.","Nie ma podstaw, by traktować płyty jako niezawodny „panel słoneczny”."],["Jak polował Spinosaurus?","<em>Spinosaurus</em> miał pysk i zęby podobne funkcjonalnie do zwierząt chwytających śliską zdobycz, a jego anatomia wiąże go z wodą.","Prawdopodobnie wykorzystywał brzegi rzek i płytkie wody, lecz badacze różnią się w ocenie, czy był sprawnym pływakiem podwodnym.","Kształt pyska, ogona, gęstość kości i kontekst osadów.","Hipotezy o polowaniu trzeba odróżniać od pewnej obecności w środowisku wodnym."],["Czy dromeozaury polowały w grupach?","Nagromadzenia kości dromeozaurów przy większej ofierze są czasem interpretowane jako dowód współpracy, ale mogą mieć inne przyczyny.","Mogły gromadzić się przy tym samym zasobie bez skoordynowanego polowania, podobnie jak niektóre współczesne gady i ptaki.","Wiek osobników, rozkład kości i charakter stanowiska.","Sama liczba osobników w jednym miejscu nie dowodzi zachowania społecznego."],["Jak brzmiały dinozaury?","Tkanki tworzące głos zachowują się bardzo rzadko, dlatego dźwięki dinozaurów rekonstruuje się pośrednio przez porównanie z ptakami i krokodylami.","Niektóre gatunki mogły wydawać niskie pomruki, a grzebienie hadrozaurów mogły modyfikować dźwięk, lecz nie znamy ich dokładnych głosów.","Anatomię dróg oddechowych i modelowanie rezonansu.","Filmowe ryki są decyzją artystyczną, nie zapisem kopalnym."],["Jak wyglądały naprawdę?","Kolor, pióra, skóra i tkanki miękkie można czasem badać dzięki wyjątkowo zachowanym odciskom oraz melanosomom.","Dla wielu dużych gatunków nadal znamy przede wszystkim szkielet, więc pełne ilustracje zawierają elementy o różnym stopniu pewności.","Zachowane integumenty, melanosomy i bliskich krewnych.","Brak dowodu piór w skamieniałości nie zawsze dowodzi ich braku za życia."],["Jak nowe odkrycia zmieniają nasze wyobrażenia?","Nowy okaz może połączyć wcześniej znane fragmenty, ujawnić wiek osobnika albo skorygować położenie cechy na drzewie pokrewieństwa.","Zmiana rekonstrukcji nie oznacza porażki nauki, lecz aktualizację najlepszego wyjaśnienia po uzyskaniu nowych danych.","Kompletność materiału i niezależne powtórzenie analizy.","Warto odróżnić pojedynczą sensację od trwałej zmiany popartej wieloma badaniami."]]],[30,"Dinozaury kontra popkultura","Porównujemy historię obrazów dinozaurów z aktualnymi dowodami, nie odbierając popkulturze jej wartości rozrywkowej.",[["Dinozaury w pierwszych książkach i ilustracjach","Wczesne ilustracje opierały się na nielicznych kościach i analogiach do współczesnych gadów, więc wiele sylwetek było nieprecyzyjnych.","Artyści i badacze musieli rekonstruować całe zwierzęta z fragmentów, zanim znano liczne kompletne szkielety i ich ślady.","Jakim materiałem dysponowano w chwili powstania ilustracji.","Dawna ilustracja może być ważna historycznie mimo nieaktualnej anatomii."],["Jak zmieniał się ich wizerunek?","Wizerunek dinozaurów przeszedł od ociężałych „jaszczurów” do aktywnych, zróżnicowanych zwierząt, często z piórami.","Zmiana wynikała z nowych skamieniałości, biomechaniki i lepszego rozumienia pokrewieństwa ptaków z teropodami.","Datę ilustracji i wiedzę dostępną jej twórcom.","Nowoczesny obraz również zawiera hipotezy, które mogą zostać poprawione."],["Jurassic Park i Jurassic World","Filmy z serii <em>Jurassic Park</em> popularyzują dinozaury, ale łączą dane naukowe z wymaganiami narracji i efektów specjalnych.","Wiele ekranowych zwierząt ma zmienione rozmiary, skórę albo zachowanie, a niektóre przedstawiane są jako hybrydy fikcyjne.","Czy film rozróżnia nazwę gatunku, czas geologiczny i cechy potwierdzone.","Realistyczny ruch na ekranie nie jest automatycznie dowodem poprawnej anatomii."],["Dinozaury w filmach i serialach","Dokumenty i fabuły używają innych zasad: pierwsze próbują wyjaśniać dowody, drugie przede wszystkim budują emocje i opowieść.","Dobra produkcja może jasno zaznaczać, które elementy są pewne, a które są rekonstrukcją twórców.","Konsultacje naukowe, źródła i język pewności w narracji.","Obecność konsultanta nie gwarantuje, że każda scena jest aktualna."],["Dinozaury w grach","Gry pozwalają badać fikcyjne ekosystemy, lecz często zmieniają rozmiary, tempo ruchu i dietę zwierząt dla równowagi rozgrywki.","Mogą rozbudzać ciekawość, jeśli gracz odróżnia mechanikę gry od informacji paleontologicznej.","Czy opis encyklopedyczny jest oddzielony od mechaniki.","Punktów życia i zdolności specjalnych nie należy traktować jako danych biologicznych."],["Najczęstsze błędy popkultury","Do częstych błędów należą brak piór u części teropodów, łączenie gatunków z odległych epok i przedstawianie wszystkich dinozaurów jako ryczących potworów.","Błędne jest też nazywanie dinozaurami pterozaurów, mozazaurów i wymarłych synapsydów.","Wiek geologiczny, pokrycie ciała i pokrewieństwo zwierzęcia.","Nie każda nieścisłość jest równie ważna dla sensu opowieści."],["Co filmy pokazują poprawnie?","Współczesne filmy często trafnie pokazują, że dinozaury były aktywne, różnorodne i blisko spokrewnione z ptakami.","Dobrze oddany może być też złożony krajobraz roślinożerców i drapieżników, choć szczegóły zachowania zwykle pozostają hipotetyczne.","Czy element wynika z anatomii, śladów lub wiarygodnej analogii.","Poprawny motyw nie sprawia, że cała scena staje się dokumentem naukowym."]]],[31,"Jak rozpoznawać dinozaury?","Praktykujemy rozpoznawanie grup na podstawie kombinacji cech, a nie jednego efektownego szczegółu.",[["Kształt czaszki","Czaszka może wskazać sposób pobierania pokarmu i przynależność do większej grupy: inne proporcje ma teropod, a inne ceratops lub hadrozaur.","Warto patrzeć na pysk, oczodoły, okna czaszkowe, grzebienie i miejsca przyczepu mięśni, a nie tylko ogólny zarys.","Położenie zębów, otworów i kości czaszki.","Czaszki młodych osobników mogą znacząco różnić się od czaszek dorosłych."],["Zęby","Zęby dostarczają informacji o diecie, lecz ich kształt odzwierciedla przede wszystkim pobieranie i przetwarzanie pokarmu.","Ząbkowane zęby teropodów cięły mięso, a liczne zęby baterii zębowej hadrozaurów pomagały rozdrabniać rośliny.","Kształt korony, zużycie, wymianę i rozmieszczenie zębów.","Ten sam typ zęba nie identyfikuje samodzielnie konkretnego rodzaju."],["Budowa kończyn","Proporcje kończyn pomagają rozpoznać sposób lokomocji: zauropody wspierały wielką masę na czterech nogach, a wiele teropodów poruszało się dwunożnie.","Dłonie, stopy, pazury i miejsca przyczepu mięśni pokazują dodatkowo funkcje chwytne, obronne lub podporowe.","Stosunek długości kości i budowę stawów.","Z samej kości nie obliczymy pewnie maksymalnej prędkości zwierzęcia."],["Miednica","Miednica jest ważna w rozpoznawaniu dużych grup: u ptasiomiednicznych kość łonowa skierowana jest zwykle ku tyłowi, a u jaszczuromiednicznych często ku przodowi.","Nazwy tych grup nie mówią jednak, które z nich dały początek ptakom; ptaki są teropodami, a więc jaszczuramiiednicznymi.","Kierunek kości łonowej i całą budowę obręczy.","Ułożenie miednicy zmieniało się też niezależnie w różnych liniach."],["Pancerze, rogi i kryzy","Osteodermy, rogi, kolce i kryzy są wyrazistymi cechami, lecz trzeba pytać, jak łączyły się ze szkieletem i czy zmieniały się z wiekiem.","Pancerz kojarzy się z ankylozaurami, a rogi i kryzy z ceratopsami, jednak szczegółowy kształt rozróżnia rodzaje.","Materiał kostny, powierzchnię przyczepu i symetrię struktur.","Efektowne ozdoby nie zawsze służyły wyłącznie obronie."],["Rozpoznawanie głównych grup","Zauropody rozpoznasz po długiej szyi i kolumnowych kończynach, teropody po dwunożnej postawie, a ornitopody po wyspecjalizowanych szczękach roślinożerców.","Ceratopsy, ankylozaury i stegozaury mają dodatkowe zestawy cech czaszki albo pancerza, które należy analizować razem.","Zestaw cech, nie jedną ilustracyjną sylwetkę.","Nie każdy fragment kości pozwala wiarygodnie wskazać grupę."],["Ćwiczenia z identyfikacji","Identyfikacja zaczyna się od opisu: liczby palców, kształtu zęba, przekroju kości i miejsca znaleziska.","Dopiero potem porównuje się cechy z materiałem referencyjnym i formułuje wniosek z odpowiednim poziomem pewności.","Dokładny opis, skala na zdjęciu i kontekst geologiczny.","W nauce poprawne „nie wiem” jest lepsze niż nazwa podana bez podstaw."]]],[32,"Encyklopedia dinozaurów","Ta część wyjaśnia, jak czytać karty rodzajów i porównywać dane bez traktowania każdej liczby jako bezdyskusyjnego faktu.",[["Nazwa i jej znaczenie","Nazwa naukowa zwykle składa się z nazwy rodzaju i gatunku, a jej etymologia może opisywać cechę, miejsce lub osobę.","Etymologia jest ciekawa, ale nie zastępuje diagnozy, czyli zestawu cech odróżniających dany takson od innych.","Pełną pisownię łacińską i publikację, w której nazwę ustanowiono.","Znaczenie nazwy nie zawsze trafnie oddaje późniejsze rozumienie zwierzęcia."],["Okres występowania","Wiek rodzaju podaje się przez jednostki geologiczne oraz przedział milionów lat, oparty na datowaniu warstwy.","Dwa dinozaury z tego samego „okresu” mogły żyć w odstępie wielu milionów lat, dlatego potrzebny jest dokładniejszy kontekst.","Formację geologiczną, piętro i metodę datowania.","Data skamieniałości nie zawsze oznacza dokładny czas życia całego rodzaju."],["Miejsce występowania","Mapa występowania pokazuje miejsca znanych skamieniałości, nie pełny zasięg dawnej populacji.","Należy uwzględnić paleogeografię: dzisiejsze kontynenty miały w mezozoiku inne położenie i połączenia lądowe.","Lokalizację stanowisk oraz ich wiek.","Brak znalezisk może wynikać z braku odsłonięć lub badań."],["Wielkość","Wielkość opisuje się najczęściej długością, wysokością bioder lub wymiarami kości, zależnie od zachowanego materiału.","Najlepiej podawać przybliżenie albo przedział i zaznaczać, czy chodzi o konkretny okaz czy model dorosłego osobnika.","Który wymiar jest mierzony i z jakiego okazu pochodzi.","Rysunek w tej samej skali jest często bardziej pouczający niż jedna liczba."],["Masa","Masa dinozaura jest wynikiem modelowania objętości ciała i gęstości tkanek, dlatego bywa aktualizowana wraz z lepszymi metodami.","Kości kończyn niosą informacje o obciążeniu, ale nie dają jednej bezpośredniej wartości masy.","Zastosowaną metodę, założenia o tkankach i przedział błędu.","Precyzja do pojedynczego kilograma jest pozorna dla wymarłego zwierzęcia."],["Dieta","Dietę rozpoznaje się z zębów, dzioba, zużycia szkliwa, zawartości jamy brzusznej i śladów ugryzień, gdy takie dane są dostępne.","Określenie „roślinożerca” albo „mięsożerca” jest użyteczne, ale nie opisuje wszystkich sezonowych i okazjonalnych zachowań.","Narządy pobierania pokarmu oraz bezpośrednie ślady jedzenia.","Wniosek o diecie powinien być silniejszy przy kilku niezależnych rodzajach danych."],["Budowa","Opis budowy powinien oddzielać zachowane kości od rekonstrukcji mięśni, skóry, piór i barw.","Cechy takie jak pneumatyzacja, osteodermy czy grzebień są ważne, gdy podaje się ich położenie i możliwą funkcję.","Co zachowało się bezpośrednio, a co jest rekonstrukcją.","Ładna ilustracja może ukrywać niepewność dotyczącą tkanek miękkich."],["Zachowanie","Zachowanie wymarłych zwierząt bada się ostrożnie przez tropy, gniazda, nagromadzenia osobników, biomechanikę i analogie z żyjącymi krewnymi.","Najlepsze wnioski są zwykle konkretne, na przykład o chodzie lub opiece nad gniazdem, a nie o całej „osobowości” gatunku.","Bezpośredni ślad zachowania i jego kontekst.","Analogii do ptaków lub krokodyli nie wolno traktować jak dowodu bezpośredniego."],["Środowisko","Środowisko odtwarza się z rodzaju osadu, roślin, innych zwierząt, minerałów i struktur sedymentacyjnych na stanowisku.","Ten sam rodzaj mógł występować w mozaice siedlisk, dlatego proste etykiety typu „dżungla” bywają mylące.","Skałę osadową, skamieniałości towarzyszące i wskaźniki klimatu.","Miejsce znalezienia szczątków nie zawsze jest miejscem śmierci zwierzęcia."],["Historia odkrycia","Historia odkrycia obejmuje znalezienie, przygotowanie okazu, opis naukowy i późniejsze reinterpretacje.","Warto sprawdzać numer katalogowy okazu oraz to, czy dana kość należała do materiału typowego dla nazwy.","Publikację opisową, muzeum i oznaczenie holotypu.","Starsza nazwa może zostać zmieniona, jeśli nowe badania wykażą jej problematyczny status."],["Ciekawostki","Ciekawostka jest wartościowa, gdy prowadzi do pytania o dowody, zamiast zastępować nimi cały opis zwierzęcia.","Dobra karta encyklopedyczna odróżnia interesującą obserwację od sensacyjnej, lecz słabo udokumentowanej anegdoty.","Czy ciekawostka ma źródło i odnosi się do właściwego rodzaju.","Rekord lub wyjątkowa cecha może dotyczyć tylko jednego okazu."],["Aktualny stan wiedzy","Stan wiedzy oznacza aktualny konsensus oraz sprawy nadal otwarte, a nie listę informacji bez daty i źródła.","W opisie warto zaznaczyć, czy rodzaj jest znany z wielu szkieletów, jednego fragmentu czy materiału o spornej klasyfikacji.","Datę publikacji i jakość dostępnego materiału.","Pewność w nauce jest stopniowalna, więc język powinien to pokazywać."]]],[33,"Fakty i mity o dinozaurach","Rozbrajamy popularne twierdzenia, sprawdzając definicje, wiek geologiczny i bezpośrednie dowody.",[["Czy wszystkie dinozaury były ogromne?","Nie, wiele dinozaurów miało rozmiary psa, indyka lub gołębia, a ich wielkość obejmowała bardzo szeroki zakres.","Skamieniałości małych gatunków zachowują się trudniej i bywają mniej widowiskowe, co może zniekształcać publiczny obraz.","Rozmiar dorosłych osobników i różnorodność różnych grup.","Mały okaz nie musi należeć do małego gatunku; może być młody."],["Czy wszystkie wyginęły?","Nie wszystkie wyginęły: ptaki są żyjącymi dinozaurami teropodami i stanowią jedyną linię dinozaurów, która przetrwała granicę K–Pg.","Wymarły wszystkie dinozaury nieptasie, lecz codziennie obserwujemy ich współczesnych potomków i krewnych.","Cechy wspólne ptaków i teropodów oraz analizy pokrewieństwa.","Słowo „dinozaur” w języku potocznym bywa używane zbyt wąsko."],["Czy ludzie żyli razem z dinozaurami?","Ludzie pojawili się dziesiątki milionów lat po wymarciu nieptasich dinozaurów, więc nie spotkali ich żywych.","Współistniejemy natomiast z ptakami, które są dinozaurami, co zmienia sens tego pytania.","Datowanie warstw ze szczątkami ludzi i dinozaurów.","Obraz człowieka obok <em>Triceratops</em> jest fikcją, nie sceną z historii Ziemi."],["Czy Velociraptor wyglądał jak w filmach?","<em>Velociraptor</em> był znacznie mniejszy niż filmowe drapieżniki i miał pióra na przednich kończynach.","Ekranowy wizerunek czerpał częściowo z cech większego <em>Deinonychus</em>, a nie wyłącznie z danych o mongolskim rodzaju.","Pomiary szkieletu i dowody pokrycia ciała.","Nazwa użyta w filmie nie gwarantuje zgodności z prawdziwym zwierzęciem."],["Czy dinozaury były zimnokrwiste?","Prosty podział na „zimno-” i „ciepłokrwiste” nie opisuje dobrze fizjologii dinozaurów, która mogła być zróżnicowana.","Szybki wzrost, izolacja piórami i aktywny tryb życia wskazują, że wiele z nich miało wysokie tempo metabolizmu.","Tempo wzrostu kości, izotopy i porównania z ptakami.","Nie wszystkie gatunki musiały regulować temperaturę w ten sam sposób."],["Czy T. rex nie widział nieruchomych obiektów?","Nie ma naukowych podstaw dla tezy, że <em>Tyrannosaurus rex</em> widział tylko poruszające się obiekty.","Budowa czaszki sugeruje dobre widzenie obuoczne, a fikcyjny motyw filmu nie wynika z anatomii dinozaura.","Położenie oczodołów i modele pola widzenia.","Zmysłów wymarłego zwierzęcia nie należy wyprowadzać z jednej sceny filmowej."],["Najpopularniejsze internetowe mity","Internet często powtarza fałszywe rekordy, nieprawdziwe cytaty i obrazy bez skali lub źródła, bo łatwo je udostępniać.","Sprawdzenie autora, daty, muzeum, publikacji i porównania z kilkoma wiarygodnymi źródłami zwykle szybko ujawnia problem.","Pochodzenie obrazka i możliwość odnalezienia pierwotnego źródła.","Duża liczba udostępnień nie zwiększa wiarygodności twierdzenia."]]],[34,"Zostań ekspertem od dinozaurów","Kończymy kurs metodą krytycznego czytania informacji i samodzielnego formułowania ostrożnych wniosków.",[["Jak rozpoznawać główne grupy","Najpierw rozpoznaj ogólny plan ciała, liczbę kończyn podporowych, czaszkę i uzębienie, a dopiero potem zawężaj identyfikację.","Teropody, zauropody i ptasiomiedniczne różnią się kombinacjami cech, których nie zastąpi jedna nazwa z ilustracji.","Kilka niezależnych cech oraz wiek i miejsce znaleziska.","Fragmentaryczny okaz może pozwalać jedynie na rozpoznanie większej grupy."],["Jak czytać nazwy naukowe","Nazwę rodzaju zapisuje się kursywą wielką literą, a nazwę gatunku kursywą małą literą, na przykład <em>Tyrannosaurus rex</em>.","Po pierwszym pełnym zapisie można skracać nazwę rodzaju, lecz skrót musi pozostać jednoznaczny w danym tekście.","Pisownię, autora nazwy i ewentualne synonimy.","Nazwa naukowa może się zmienić po rewizji materiału, nie znaczy to jednak, że zwierzę „przestało istnieć”."],["Jak korzystać z drzewa ewolucyjnego","Drzewo ewolucyjne pokazuje hipotezę pokrewieństwa, a wspólny węzeł oznacza wspólnego przodka, nie „wyższą” lub „niższą” formę.","Gałęzie można obracać wokół węzła bez zmiany relacji, dlatego należy śledzić rozgałęzienia, a nie kolejność nazw na rysunku.","Węzły, grupy siostrzane i cechy wspólne gałęzi.","Długość gałęzi nie zawsze oznacza czas ani liczbę zmian."],["Jak odróżniać fakt od hipotezy","Faktem może być obserwacja zachowanej kości lub jej wieku w warstwie, a hipotezą rekonstrukcja koloru, zachowania albo pokrewieństwa.","Hipoteza naukowa nie jest dowolnym przypuszczeniem: powinna wynikać z danych i umożliwiać sprawdzenie lub podważenie.","Język pewności, metodę oraz dane przedstawione przez autorów.","Brak absolutnej pewności nie oznacza, że wszystkie wyjaśnienia są równie dobre."],["Jak śledzić nowe odkrycia","Nowe odkrycia najbezpieczniej śledzić przez muzea, czasopisma naukowe, uczelnie i komunikaty autorów badań.","Nagłówek prasowy warto zestawić z publikacją lub przynajmniej z informacją o materiale, metodzie i ograniczeniach.","Autora, afiliację, datę i odnośnik do źródła pierwotnego.","Wstępna zapowiedź może się różnić od późniejszego, recenzowanego opisu."],["Jak oceniać wiarygodność informacji o dinozaurach","Wiarygodna informacja podaje źródło, oddziela dane od ilustracji i nie ukrywa niepewności za kategorycznymi hasłami.","Warto porównać kilka niezależnych opracowań oraz sprawdzić, czy autor rozróżnia dinozaury, pterozaury i inne grupy.","Możliwość sprawdzenia źródła oraz zgodność z aktualnym konsensusem.","Pewny ton i atrakcyjny obraz nie są substytutem dowodów."],["Wielki quiz końcowy","Ten finał porządkuje najważniejsze umiejętności całego kursu: rozpoznawanie grup, ocenę dowodów, czytanie czasu geologicznego i oddzielanie faktów od hipotez.","Przed odpowiedzią wróć do definicji dinozaura, zasad rekonstrukcji, granicy K–Pg oraz relacji ptaków i teropodów.","Uzasadnienie odpowiedzi na podstawie danych, a nie pamięci filmowych scen.","Gdy nie masz pewności, wskaż, jakiego dowodu potrzebowałbyś do rozstrzygnięcia."]]]];
  var i;
  for (i = 0; i < RAW.length; i += 1) { M.push(makeModule(RAW[i])); }
})();
