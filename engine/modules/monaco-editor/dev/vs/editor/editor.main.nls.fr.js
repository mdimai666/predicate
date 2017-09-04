/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.9.0(630109944f54bcdfc2dbaaff5f090c0843af6c66)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/

define("vs/editor/editor.main.nls.fr", {
	"vs/base/browser/ui/actionbar/actionbar": [
		"{0} ({1})",
	],
	"vs/base/browser/ui/aria/aria": [
		"{0} (s\'est reproduit)",
	],
	"vs/base/browser/ui/findinput/findInput": [
		"entrée",
	],
	"vs/base/browser/ui/findinput/findInputCheckboxes": [
		"Respecter la casse",
		"Mot entier",
		"Utiliser une expression régulière",
	],
	"vs/base/browser/ui/inputbox/inputBox": [
		"Erreur : {0}",
		"Avertissement : {0}",
		"Information : {0}",
	],
	"vs/base/common/keybindingLabels": [
		"Ctrl",
		"Maj",
		"Alt",
		"Windows",
		"Contrôle",
		"Maj",
		"Alt",
		"Commande",
		"Contrôle",
		"Maj",
		"Alt",
		"Windows",
	],
	"vs/base/common/severity": [
		"Erreur",
		"Avertissement",
		"Informations",
	],
	"vs/base/parts/quickopen/browser/quickOpenModel": [
		"{0}, sélecteur",
		"sélecteur",
	],
	"vs/base/parts/quickopen/browser/quickOpenWidget": [
		"Sélecteur rapide. Tapez pour réduire les résultats.",
		"Sélecteur rapide",
	],
	"vs/base/parts/tree/browser/treeDefaults": [
		"Réduire",
	],
	"vs/editor/browser/widget/diffReview": [
		"Fermer",
		"Difference {0} of {1}: original {2}, {3} lines, modified {4}, {5} lines",
		"blank",
		"original {0}, modified {1}: {2}",
		"+ modified {0}: {1}",
		"- original {0}: {1}",
		"Go to Next Difference",
		"Go to Previous Difference",
	],
	"vs/editor/common/config/commonEditorConfig": [
		"Éditeur",
		"Contrôle la famille de polices.",
		"Contrôle l\'épaisseur de police.",
		"Contrôle la taille de police en pixels.",
		"Contrôle la hauteur de ligne. Utilisez 0 pour calculer lineHeight à partir de fontSize.",
		"Définit l\'espacement des caractères en pixels.",
		"Contrôle l\'affichage des numéros de ligne. Les valeurs possibles sont \'activé\', \'désactivé\' et \'relatif\'. La valeur \'relatif\' indique le numéro de ligne à partir de la position actuelle du curseur.",
		"Colonnes où afficher les règles verticales",
		"Caractères utilisés comme séparateurs de mots durant la navigation ou les opérations basées sur les mots",
		"Nombre d\'espaces correspondant à une tabulation. Ce paramètre est remplacé en fonction du contenu du fichier quand \'editor.detectIndentation\' est activé.",
		"\'number\' attendu. Notez que la valeur \"auto\" a été remplacée par le paramètre \'editor.detectIndentation\'.",
		"Des espaces sont insérés quand vous appuyez sur la touche Tab. Ce paramètre est remplacé en fonction du contenu du fichier quand \'editor.detectIndentation\' est activé.",
		"\'boolean\' attendu. Notez que la valeur \"auto\" a été remplacée par le paramètre \'editor.detectIndentation\'.",
		"Quand vous ouvrez un fichier, \'editor.tabSize\' et \'editor.insertSpaces\' sont détectés en fonction du contenu du fichier.",
		"Contrôle si les sélections ont des angles arrondis",
		"Contrôle si l\'éditeur défile au-delà de la dernière ligne",
		"Contrôle si la minicarte est affichée",
		"Contrôle si le curseur de la minicarte est automatiquement masqué",
		"Afficher les caractères réels sur une ligne (par opposition aux blocs de couleurs)",
		"Limiter la largeur de la minicarte pour afficher au maximum un certain nombre de colonnes",
		"Contrôle si nous remplissons la chaîne à rechercher dans le Widget Recherche à partir de la sélection de l\'éditeur",
		"Contrôle si l\'indicateur Rechercher dans la sélection est activé quand plusieurs caractères ou lignes de texte sont sélectionnés dans l\'éditeur",
		"Le retour automatique à la ligne n\'est jamais effectué.",
		"Le retour automatique à la ligne s\'effectue en fonction de la largeur de la fenêtre d\'affichage.",
		"Le retour automatique à la ligne s\'effectue en fonction de \'editor.wordWrapColumn\'.",
		"Retour automatique à la ligne au minimum en fonction de la fenêtre d\'affichage et de \'editor.wordWrapColumn\'.",
		"Contrôle le retour automatique à la ligne. Valeurs possibles :\n - \'off\' (désactive le retour automatique à la ligne) ;\n - \'on\' (retour automatique à la ligne dans la fenêtre d\'affichage) ;\n - \'wordWrapColumn\' (retour automatique à la ligne en fonction de \'editor.wordWrapColumn\') ou ;\n - \'bounded\' (retour automatique à la ligne au minimum en fonction de la fenêtre d\'affichage et de \'editor.wordWrapColumn\').",
		"Contrôle la colonne de retour automatique à la ligne de l\'éditeur quand \'editor.wordWrap\' a la valeur \'wordWrapColumn\' ou \'bounded\'.",
		"Contrôle le retrait des lignes renvoyées. La valeur peut être \'none\', \'same\' ou \'indent\'.",
		"Multiplicateur à utiliser pour le \'deltaX\' et le \'deltaY\' des événements de défilement de la roulette de la souris",
		"Mappe vers \'Contrôle\' dans Windows et Linux, et vers \'Commande\' dans OSX.",
		"Mappe vers \'Alt\' dans Windows et Linux, et vers \'Option\' dans OSX.",
		"Modificateur à utiliser pour ajouter plusieurs curseurs avec la souris. \'ctrlCmd\' mappe vers \'Contrôle\' dans Windows et Linux, et vers \'Commande\' dans OSX. Les mouvements de souris Accéder à la définition et Ouvrir le lien s\'adaptent pour ne pas entrer en conflit avec le modificateur multicurseur.",
		"Activez les suggestions rapides dans les chaînes.",
		"Activez les suggestions rapides dans les commentaires.",
		"Activez les suggestions rapides en dehors des chaînes et des commentaires.",
		"Contrôle si les suggestions doivent s\'afficher automatiquement en cours de frappe",
		"Contrôle le délai en ms au bout duquel les suggestions rapides s\'affichent",
		"Active la pop up qui affiche la documentation des paramètres et écrit de l\'information pendant que vous écrivez",
		"Contrôle si l\'éditeur doit automatiquement fermer les crochets après les avoir ouverts",
		"Contrôle si l\'éditeur doit automatiquement mettre en forme la ligne après la saisie",
		"Contrôle si l\'éditeur doit automatiquement mettre en forme le contenu collé. Un formateur doit être disponible et doit pouvoir mettre en forme une plage dans un document.",
		"Controls if the editor should automatically adjust the indentation when users type, paste or move lines. Indentation rules of the language must be available. ",
		"Contrôle si les suggestions doivent s\'afficher automatiquement durant la saisie de caractères de déclenchement",
		"Contrôle si les suggestions doivent être acceptées avec \'Entrée\', en plus de \'Tab\'. Cela permet d\'éviter toute ambiguïté entre l\'insertion de nouvelles lignes et l\'acceptation de suggestions. La valeur \'smart\' signifie que vous acceptez uniquement une suggestion avec Entrée quand elle applique une modification de texte",
		"Contrôle si les suggestions doivent être acceptées avec des caractères de validation. Par exemple, en JavaScript, le point-virgule (\';\') peut être un caractère de validation qui permet d\'accepter une suggestion et de taper ce caractère.",
		"Contrôle si les extraits de code s\'affichent en même temps que d\'autres suggestions, ainsi que leur mode de tri.",
		"Contrôle si la copie sans sélection permet de copier la ligne actuelle.",
		"Contrôle si la saisie semi-automatique doit être calculée en fonction des mots présents dans le document.",
		"Taille de police du widget de suggestion",
		"Hauteur de ligne du widget de suggestion",
		"Détermine si l\'éditeur doit surligner les correspondances similaires à la sélection",
		"Contrôle si l\'éditeur doit mettre en surbrillance les occurrences de symboles sémantiques",
		"Contrôle le nombre d\'ornements pouvant s\'afficher à la même position dans la règle d\'aperçu",
		"Contrôle si une bordure doit être dessinée autour de la règle d\'aperçu.",
		"Contrôle le style d\'animation du curseur. Valeurs possibles : \'blink\', \'smooth\', \'phase\', \'expand\' et \'solid\'",
		"Agrandir ou réduire la police de l\'éditeur quand l\'utilisateur fait tourner la roulette de la souris tout en maintenant la touche Ctrl enfoncée",
		"Contrôle le style du curseur. Les valeurs acceptées sont \'block\', \'block-outline\', \'line\', \'line-thin\', \'underline\' et \'underline-thin\'",
		"Active les ligatures de police",
		"Contrôle si le curseur doit être masqué dans la règle d\'aperçu.",
		"Contrôle la façon dont l\'éditeur affiche les espaces blancs. Il existe trois options possibles : \'none\', \'boundary\' et \'all\'. L\'option \'boundary\' n\'affiche pas les espaces uniques qui séparent les mots.",
		"Contrôle si l\'éditeur doit afficher les caractères de contrôle",
		"Contrôle si l\'éditeur doit afficher les repères de mise en retrait",
		"Contrôle la façon dont l\'éditeur doit afficher la surbrillance de la ligne active. Les différentes possibilités sont \'none\', \'gutter\', \'line\' et \'all\'.",
		"Contrôle si l\'éditeur affiche les indicateurs CodeLens",
		"Contrôle si le pliage de code est activé dans l\'éditeur",
		"Définit si les contrôles de réduction sur la bordure sont cachés automatiquement",
		"Met en surbrillance les crochets correspondants quand l\'un d\'eux est sélectionné.",
		"Contrôle si l\'éditeur doit afficher la marge de glyphes verticale. La marge de glyphes sert principalement au débogage.",
		"L\'insertion et la suppression d\'un espace blanc suit les taquets de tabulation",
		"Supprimer l\'espace blanc de fin inséré automatiquement",
		"Garder les éditeurs d\'aperçu ouverts même si l\'utilisateur double-clique sur son contenu ou appuie sur la touche Échap.",
		"Contrôle si l\'éditeur autorise le déplacement des sélections par glisser-déplacer.",
		"L\'éditeur utilise les API de la plateforme pour détecter si un lecteur d\'écran est attaché.",
		"L\'éditeur est optimisé en permanence pour une utilisation avec un lecteur d\'écran.",
		"L\'éditeur n\'est jamais optimisé pour une utilisation avec un lecteur d\'écran.",
		"Contrôle si l\'éditeur doit s\'exécuter dans un mode optimisé pour les lecteurs d\'écran.",
		"Contrôle si l\'éditeur doit détecter les liens et les rendre cliquables",
		"Contrôle si l\'éditeur de différences affiche les différences en mode côte à côte ou inline",
		"Contrôle si l\'éditeur de différences affiche les changements liés aux espaces blancs de début ou de fin comme des différences",
		"Contrôle si l\'éditeur de différences affiche les indicateurs +/- pour les modifications ajoutées/supprimées",
		"Contrôle si le presse-papiers primaire Linux doit être pris en charge.",
	],
	"vs/editor/common/config/editorOptions": [
		"L\'éditeur n\'est pas accessible pour le moment. Appuyez sur Alt+F1 pour connaître les options.",
		"Contenu d\'éditeur",
	],
	"vs/editor/common/controller/cursor": [
		"Exception inattendue pendant l\'exécution de la commande.",
	],
	"vs/editor/common/model/textModelWithTokens": [
		"Le mode a échoué lors de la création de jetons de l’entrée.",
	],
	"vs/editor/common/modes/modesRegistry": [
		"Texte brut",
	],
	"vs/editor/common/services/bulkEdit": [
		"Ces fichiers ont changé pendant ce temps : {0}",
		"Aucune modification effectuée",
		"{0} modifications de texte effectuées dans {1} fichiers",
		"{0} modifications de texte effectuées dans un fichier",
	],
	"vs/editor/common/services/modelServiceImpl": [
		"[{0}]\n{1}",
		"[{0}] {1}",
	],
	"vs/editor/common/view/editorColorRegistry": [
		"Couleur d\'arrière-plan de la mise en surbrillance de la ligne à la position du curseur.",
		"Couleur d\'arrière-plan de la bordure autour de la ligne à la position du curseur.",
		"Couleur d\'arrière-plan des plages mises en surbrillance, par exemple par les fonctionnalités de recherche et Quick Open.",
		"Couleur du curseur de l\'éditeur.",
		"Couleur des espaces blancs dans l\'éditeur.",
		"Couleur des repères de retrait de l\'éditeur.",
		"Couleur des numéros de ligne de l\'éditeur.",
		"Couleur des règles de l\'éditeur",
		"Couleur pour les indicateurs CodeLens",
		"Couleur d\'arrière-plan pour les accolades associées",
		"Couleur pour le contour des accolades associées",
		"Couleur de la bordure de la règle d\'apperçu.",
		"Couleur de fond pour la bordure de l\'éditeur. La bordure contient les marges pour les symboles et les numéros de ligne.",
		"Couleur de premier plan de la ligne ondulée marquant les erreurs dans l\'éditeur.",
		"Couleur de bordure de la ligne ondulée marquant les erreurs dans l\'éditeur.",
		"Couleur de premier plan de la ligne ondulée marquant les avertissements dans l\'éditeur.",
		"Couleur de bordure de la ligne ondulée marquant les avertissements dans l\'éditeur.",
	],
	"vs/editor/contrib/bracketMatching/common/bracketMatching": [
		"Atteindre le crochet",
	],
	"vs/editor/contrib/caretOperations/common/caretOperations": [
		"Déplacer le point d\'insertion vers la gauche",
		"Déplacer le point d\'insertion vers la droite",
	],
	"vs/editor/contrib/caretOperations/common/transpose": [
		"Transposer les lettres",
	],
	"vs/editor/contrib/clipboard/browser/clipboard": [
		"Couper",
		"Copier",
		"Coller",
		"Copier avec la coloration syntaxique",
	],
	"vs/editor/contrib/comment/common/comment": [
		"Activer/désactiver le commentaire de ligne",
		"Ajouter le commentaire de ligne",
		"Supprimer le commentaire de ligne",
		"Activer/désactiver le commentaire de bloc",
	],
	"vs/editor/contrib/contextmenu/browser/contextmenu": [
		"Afficher le menu contextuel de l\'éditeur",
	],
	"vs/editor/contrib/find/browser/findWidget": [
		"Rechercher",
		"Rechercher",
		"Correspondance précédente",
		"Correspondance suivante",
		"Rechercher dans la sélection",
		"Fermer",
		"Remplacer",
		"Remplacer",
		"Remplacer",
		"Tout remplacer",
		"Changer le mode de remplacement",
		"Seuls les 999 premiers résultats sont mis en surbrillance. Cependant, toutes les opérations de recherche sont appliquées à l\'ensemble du texte.",
		"{0} sur {1}",
		"Aucun résultat",
	],
	"vs/editor/contrib/find/common/findController": [
		"Rechercher",
		"Rechercher suivant",
		"Rechercher précédent",
		"Sélection suivante",
		"Sélection précédente",
		"Remplacer",
		"Ajouter la sélection à la correspondance de recherche suivante",
		"Ajouter la sélection à la correspondance de recherche précédente",
		"Déplacer la dernière sélection vers la correspondance de recherche suivante",
		"Déplacer la dernière sélection à la correspondance de recherche précédente",
		"Sélectionner toutes les occurrences des correspondances de la recherche",
		"Modifier toutes les occurrences",
	],
	"vs/editor/contrib/folding/browser/folding": [
		"Déplier",
		"Déplier de manière récursive",
		"Plier",
		"Plier de manière récursive",
		"Plier tout",
		"Déplier tout",
		"Niveau de pliage {0}",
	],
	"vs/editor/contrib/format/browser/formatActions": [
		"1 modification de format effectuée à la ligne {0}",
		"{0} modifications de format effectuées à la ligne {1}",
		"1 modification de format effectuée entre les lignes {0} et {1}",
		"{0} modifications de format effectuées entre les lignes {1} et {2}",
		"Mettre en forme le document",
		"Mettre en forme la sélection",
	],
	"vs/editor/contrib/goToDeclaration/browser/goToDeclarationCommands": [
		"Définition introuvable pour \'{0}\'",
		"Définition introuvable",
		" – {0} définitions",
		"Atteindre la définition",
		"Ouvrir la définition sur le côté",
		"Apercu de définition",
		"Implémentation introuvable pour \'{0}\'",
		"Implémentation introuvable",
		"– Implémentations {0}",
		"Accéder à l\'implémentation",
		"Aperçu de l\'implémentation",
		"Définition de type introuvable pour \'{0}\'",
		"Définition de type introuvable",
		" – Définitions de type {0}",
		"Atteindre la définition de type",
		"Aperçu de la définition du type",
	],
	"vs/editor/contrib/goToDeclaration/browser/goToDeclarationMouse": [
		"Cliquez pour afficher {0} définitions.",
	],
	"vs/editor/contrib/gotoError/browser/gotoError": [
		"({0}/{1})",
		"Accéder à l\'erreur ou l\'avertissement suivant",
		"Accéder à l\'erreur ou l\'avertissement précédent",
		"Couleur d\'erreur du widget de navigation dans les marqueurs de l\'éditeur.",
		"Couleur d\'avertissement du widget de navigation dans les marqueurs de l\'éditeur.",
		"Arrière-plan du widget de navigation dans les marqueurs de l\'éditeur.",
	],
	"vs/editor/contrib/hover/browser/hover": [
		"Afficher par pointage",
	],
	"vs/editor/contrib/hover/browser/modesContentHover": [
		"Chargement...",
	],
	"vs/editor/contrib/inPlaceReplace/common/inPlaceReplace": [
		"Remplacer par la valeur précédente",
		"Remplacer par la valeur suivante",
	],
	"vs/editor/contrib/linesOperations/common/linesOperations": [
		"Copier la ligne en haut",
		"Copier la ligne en bas",
		"Déplacer la ligne vers le haut",
		"Déplacer la ligne vers le bas",
		"Trier les lignes dans l\'ordre croissant",
		"Trier les lignes dans l\'ordre décroissant",
		"Découper l\'espace blanc de fin",
		"Supprimer la ligne",
		"Mettre en retrait la ligne",
		"Ajouter un retrait négatif à la ligne",
		"Insérer une ligne au-dessus",
		"Insérer une ligne sous",
		"Supprimer tout ce qui est à gauche",
		"Supprimer tout ce qui est à droite",
		"Joindre les lignes",
		"Transposer les caractères autour du curseur",
		"Transformer en majuscule",
		"Transformer en minuscule",
	],
	"vs/editor/contrib/links/browser/links": [
		"Commande + clic pour suivre le lien",
		"Ctrl + clic pour suivre le lien",
		"Alt + clic pour suivre le lien",
		"Échec de l\'ouverture de ce lien, car il n\'est pas bien formé : {0}",
		"Échec de l\'ouverture de ce lien, car sa cible est manquante.",
		"Ouvrir le lien",
	],
	"vs/editor/contrib/multicursor/common/multicursor": [
		"Ajouter un curseur au-dessus",
		"Ajouter un curseur en dessous",
		"Ajouter des curseurs à la fin des lignes",
	],
	"vs/editor/contrib/parameterHints/browser/parameterHints": [
		"Indicateurs des paramètres Trigger",
	],
	"vs/editor/contrib/parameterHints/browser/parameterHintsWidget": [
		"{0}, conseil",
	],
	"vs/editor/contrib/quickFix/browser/quickFixCommands": [
		"Afficher les correctifs ({0})",
		"Afficher les correctifs",
		"Correctif rapide",
	],
	"vs/editor/contrib/referenceSearch/browser/referenceSearch": [
		" – {0} références",
		"Rechercher toutes les références",
	],
	"vs/editor/contrib/referenceSearch/browser/referencesController": [
		"Chargement...",
	],
	"vs/editor/contrib/referenceSearch/browser/referencesModel": [
		"symbole dans {0} sur la ligne {1}, colonne {2}",
		"1 symbole dans {0}, chemin complet {1}",
		"{0} symboles dans {1}, chemin complet {2}",
		"Résultats introuvables",
		"1 symbole dans {0}",
		"{0} symboles dans {1}",
		"{0} symboles dans {1} fichiers",
	],
	"vs/editor/contrib/referenceSearch/browser/referencesWidget": [
		"Échec de la résolution du fichier.",
		"{0} références",
		"{0} référence",
		"aperçu non disponible",
		"Références",
		"Aucun résultat",
		"Références",
		"Couleur d\'arrière-plan de la zone de titre de l\'affichage d\'aperçu.",
		"Couleur du titre de l\'affichage d\'aperçu.",
		"Couleur des informations sur le titre de l\'affichage d\'aperçu.",
		"Couleur des bordures et de la flèche de l\'affichage d\'aperçu.",
		"Couleur d\'arrière-plan de la liste des résultats de l\'affichage d\'aperçu.",
		"Couleur de premier plan des noeuds de lignes dans la liste des résultats de l\'affichage d\'aperçu.",
		"Couleur de premier plan des noeuds de fichiers dans la liste des résultats de l\'affichage d\'aperçu.",
		"Couleur d\'arrière-plan de l\'entrée sélectionnée dans la liste des résultats de l\'affichage d\'aperçu.",
		"Couleur de premier plan de l\'entrée sélectionnée dans la liste des résultats de l\'affichage d\'aperçu.",
		"Couleur d\'arrière-plan de l\'éditeur d\'affichage d\'aperçu.",
		"Couleur d\'arrière-plan de la bordure de l\'éditeur d\'affichage d\'aperçu.",
		"Couleur de mise en surbrillance d\'une correspondance dans la liste des résultats de l\'affichage d\'aperçu.",
		"Couleur de mise en surbrillance d\'une correspondance dans l\'éditeur de l\'affichage d\'aperçu.",
	],
	"vs/editor/contrib/rename/browser/rename": [
		"Aucun résultat.",
		"\'{0}\' renommé en \'{1}\'. Récapitulatif : {2}",
		"Échec de l\'exécution du renommage.",
		"Renommer le symbole",
	],
	"vs/editor/contrib/rename/browser/renameInputField": [
		"Renommez l\'entrée. Tapez le nouveau nom et appuyez sur Entrée pour valider.",
	],
	"vs/editor/contrib/smartSelect/common/smartSelect": [
		"Développer la sélection",
		"Réduire la sélection",
	],
	"vs/editor/contrib/suggest/browser/suggestController": [
		"L\'acceptation de \'{0}\' a inséré le texte suivant : {1}",
		"Suggestions pour Trigger",
	],
	"vs/editor/contrib/suggest/browser/suggestWidget": [
		"Couleur d\'arrière-plan du widget de suggestion.",
		"Couleur de bordure du widget de suggestion.",
		"Couleur de premier plan du widget de suggestion.",
		"Couleur d\'arrière-plan de l\'entrée sélectionnée dans le widget de suggestion.",
		"Couleur de la surbrillance des correspondances dans le widget de suggestion.",
		"En savoir plus...{0}",
		"{0}, suggestion, avec détails",
		"{0}, suggestion",
		"En savoir moins...{0}",
		"Chargement...",
		"Pas de suggestions.",
		"{0}, accepté",
		"{0}, suggestion, avec détails",
		"{0}, suggestion",
	],
	"vs/editor/contrib/toggleTabFocusMode/common/toggleTabFocusMode": [
		"Activer/désactiver l\'utilisation de la touche Tab pour déplacer le focus",
	],
	"vs/editor/contrib/wordHighlighter/common/wordHighlighter": [
		"Couleur d\'arrière-plan d\'un symbole durant l\'accès en lecture, par exemple la lecture d\'une variable.",
		"Couleur d\'arrière-plan d\'un symbole durant l\'accès en écriture, par exemple l\'écriture dans une variable.",
	],
	"vs/editor/contrib/zoneWidget/browser/peekViewWidget": [
		"Fermer",
	],
	"vs/editor/standalone/browser/inspectTokens/inspectTokens": [
		"Developer: Inspect Tokens",
	],
	"vs/editor/standalone/browser/quickOpen/gotoLine": [
		"Go to line {0} and character {1}",
		"Go to line {0}",
		"Type a line number between 1 and {0} to navigate to",
		"Type a character between 1 and {0} to navigate to",
		"Go to line {0}",
		"Type a line number, followed by an optional colon and a character number to navigate to",
		"Go to Line...",
	],
	"vs/editor/standalone/browser/quickOpen/quickCommand": [
		"{0}, commands",
		"Type the name of an action you want to execute",
		"Command Palette",
	],
	"vs/editor/standalone/browser/quickOpen/quickOutline": [
		"{0}, symbols",
		"Type the name of an identifier you wish to navigate to",
		"Go to Symbol...",
		"symbols ({0})",
		"modules ({0})",
		"classes ({0})",
		"interfaces ({0})",
		"methods ({0})",
		"functions ({0})",
		"properties ({0})",
		"variables ({0})",
		"variables ({0})",
		"constructors ({0})",
		"calls ({0})",
	],
	"vs/editor/standalone/browser/standaloneCodeEditor": [
		"Editor content",
		"Press Ctrl+F1 for Accessibility Options.",
		"Press Alt+F1 for Accessibility Options.",
	],
	"vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast": [
		"Toggle High Contrast Theme",
	],
	"vs/platform/configuration/common/configurationRegistry": [
		"Substitutions de configuration par défaut",
		"Configurez les paramètres d\'éditeur à remplacer pour le langage {0}.",
		"Configurez les paramètres d\'éditeur à remplacer pour un langage.",
		"Impossible d\'inscrire \'{0}\'. Ceci correspond au modèle de propriété \'\\\\[.*\\\\]$\' permettant de décrire les paramètres d\'éditeur spécifiques à un langage. Utilisez la contribution \'configurationDefaults\'.",
		"Impossible d\'inscrire \'{0}\'. Cette propriété est déjà inscrite.",
	],
	"vs/platform/keybinding/common/abstractKeybindingService": [
		"Touche ({0}) utilisée. En attente de la seconde touche pour la pression simultanée...",
		"La combinaison de touches ({0}, {1}) n\'est pas une commande.",
	],
	"vs/platform/message/common/message": [
		"Fermer",
		"Plus tard",
		"Annuler",
	],
	"vs/platform/theme/common/colorRegistry": [
		"Format de couleur non valide. Utilisez #RGB, #RGBA, #RRGGBB ou #RRGGBBAA",
		"Couleurs utilisées dans le banc d\'essai.",
		"Couleur de premier plan globale. Cette couleur est utilisée si elle n\'est pas remplacée par un composant.",
		"Couleur principale de premier plan pour les messages d\'erreur. Cette couleur est utilisée uniquement si elle n\'est pas redéfinie par un composant.",
		"Couleur de premier plan du texte descriptif fournissant des informations supplémentaires, par exemple pour un label.",
		"Couleur de bordure globale des éléments ayant le focus. Cette couleur est utilisée si elle n\'est pas remplacée par un composant.",
		"Bordure supplémentaire autour des éléments pour les séparer des autres et obtenir un meilleur contraste.",
		"Bordure supplémentaire autour des éléments actifs pour les séparer des autres et obtenir un meilleur contraste.",
		"La couleur d\'arrière-plan des sélections de texte dans le banc d\'essai (par ex., pour les champs d\'entrée ou les zones de texte). Notez que cette couleur ne s\'applique pas aux sélections dans l\'éditeur et le terminal.",
		"Couleur pour les séparateurs de texte.",
		"Couleur des liens dans le texte.",
		"Couleur des liens actifs dans le texte.",
		"Couleur des segments de texte préformatés.",
		"Couleur d\'arrière-plan des citations dans le texte.",
		"Couleur de bordure des citations dans le texte.",
		"Couleur d\'arrière-plan des blocs de code dans le texte.",
		"Couleur de l\'ombre des widgets, comme rechercher/remplacer, au sein de l\'éditeur.",
		"Arrière-plan de la zone d\'entrée.",
		"Premier plan de la zone d\'entrée.",
		"Bordure de la zone d\'entrée.",
		"Couleur de la bordure des options activées dans les champs d\'entrée.",
		"Couleur de premier plan de la zone d\'entrée pour le texte d\'espace réservé.",
		"Couleur d\'arrière-plan de la validation d\'entrée pour la gravité des informations.",
		"Couleur de bordure de la validation d\'entrée pour la gravité des informations.",
		"Couleur d\'arrière-plan de la validation d\'entrée pour l\'avertissement sur les informations.",
		"Couleur de bordure de la validation d\'entrée pour la gravité de l\'avertissement.",
		"Couleur d\'arrière-plan de la validation d\'entrée pour la gravité de l\'erreur.",
		"Couleur de bordure de la validation d\'entrée pour la gravité de l\'erreur. ",
		"Arrière-plan de la liste déroulante.",
		"Premier plan de la liste déroulante.",
		"Bordure de la liste déroulante.",
		"Couleur d\'arrière-plan de la liste/l\'arborescence pour l\'élément ayant le focus quand la liste/l\'arborescence est active. Une liste/aborescence active peut être sélectionnée au clavier, elle ne l\'est pas quand elle est inactive.",
		"Couleur de premier plan de la liste/l\'arborescence pour l\'élément ayant le focus quand la liste/l\'arborescence est active. Une liste/aborescence active peut être sélectionnée au clavier, elle ne l\'est pas quand elle est inactive.",
		"Couleur d\'arrière-plan de la liste/l\'arborescence de l\'élément sélectionné quand la liste/l\'arborescence est active. Une liste/arborescence active peut être sélectionnée au clavier, elle ne l\'est pas quand elle est inactive.",
		"Couleur de premier plan de la liste/l\'arborescence pour l\'élément sélectionné quand la liste/l\'arborescence est active. Une liste/aborescence active peut être sélectionnée au clavier, elle ne l\'est pas quand elle est inactive.",
		"Couleur d\'arrière-plan de la liste/l\'arborescence pour l\'élément sélectionné quand la liste/l\'arborescence est inactive. Une liste/aborescence active peut être sélectionnée au clavier, elle ne l\'est pas quand elle est inactive.",
		"Couleur de premier plan de la liste/l\'arborescence pour l\'élément sélectionné quand la liste/l\'arborescence est active. Une liste/aborescence active peut être sélectionnée au clavier, elle ne l\'est pas quand elle est inactive.",
		"Arrière-plan de la liste/l\'arborescence pendant le pointage sur des éléments avec la souris.",
		"Premier plan de la liste/l\'arborescence pendant le pointage sur des éléments avec la souris.",
		"Arrière-plan de l\'opération de glisser-déplacer dans une liste/arborescence pendant le déplacement d\'éléments avec la souris.",
		"Couleur de premier plan dans la liste/l\'arborescence pour la surbrillance des correspondances pendant la recherche dans une liste/arborescence.",
		"Couleur du sélecteur rapide pour les étiquettes de regroupement.",
		"Couleur du sélecteur rapide pour les bordures de regroupement.",
		"Couleur de premier plan du bouton.",
		"Couleur d\'arrière-plan du bouton.",
		"Couleur d\'arrière-plan du bouton pendant le pointage.",
		"Couleur de fond des badges. Les badges sont de courts libelés d\'information, ex. le nombre de résultats de recherche.",
		"Couleur des badges. Les badges sont de courts libelés d\'information, ex. le nombre de résultats de recherche.",
		"Ombre de la barre de défilement pour indiquer que la vue défile.",
		"Couleur d\'arrière-plan du curseur.",
		"Couleur d\'arrière-plan du curseur pendant le pointage.",
		"Couleur d\'arrière-plan du curseur actif.",
		"Couleur de fond pour la barre de progression qui peut s\'afficher lors d\'opérations longues.",
		"Couleur d\'arrière-plan de l\'éditeur.",
		"Couleur de premier plan par défaut de l\'éditeur.",
		"Couleur d\'arrière-plan des gadgets de l\'éditeur tels que rechercher/remplacer.",
		"Couleur de bordure des widgets de l\'éditeur. La couleur est utilisée uniquement si le widget choisit d\'avoir une bordure et si la couleur n\'est pas remplacée par un widget.",
		"Color of the editor selection.",
		"Color of the selected text for high contrast.",
		"Couleur de la sélection dans un éditeur inactif.",
		"Couleur des régions dont le contenu est identique à la sélection.",
		"Couleur du résultat de recherche actif.",
		"Couleur des autres résultats de recherche.",
		"Couleur de la plage limitant la recherche.",
		"Mettez en surbrillance ci-dessous le mot pour lequel un pointage s\'affiche.",
		"Couleur d\'arrière-plan du pointage de l\'éditeur.",
		"Couleur de bordure du pointage de l\'éditeur.",
		"Couleur des liens actifs.",
		"Couleur d\'arrière-plan du texte inséré.",
		"Couleur d\'arrière-plan du texte supprimé.",
		"Couleur de contour du texte inséré.",
		"Couleur de contour du texte supprimé.",
		"Arrière-plan de l\'en-tête actuel dans les conflits de fusion inline.",
		"Arrière-plan du contenu actuel dans les conflits de fusion inline.",
		"Arrière-plan de l\'en-tête entrant dans les conflits de fusion inline.",
		"Arrière-plan du contenu entrant dans les conflits de fusion inline.",
		"Arrière-plan de l\'en-tête de l\'ancêtre commun dans les conflits de fusion inline.",
		"Arrière-plan du contenu de l\'ancêtre commun dans les conflits de fusion inline.",
		"Couleur de bordure des en-têtes et du séparateur dans les conflits de fusion inline.",
		"Premier plan de la règle d\'aperçu actuelle pour les conflits de fusion inline.",
		"Premier plan de la règle d\'aperçu entrante pour les conflits de fusion inline.",
		"Arrière-plan de la règle d\'aperçu de l\'ancêtre commun dans les conflits de fusion inline.",
	]
});