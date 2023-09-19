CREATE DATABASE IF NOT EXISTS PokemonDB;
USE PokemonDB;

CREATE TABLE IF NOT EXISTS Users (id INT NOT NULL AUTO_INCREMENT,username VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,token VARCHAR(255),PRIMARY KEY (id));
CREATE TABLE IF NOT EXISTS Types (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(255) NOT NULL,PRIMARY KEY (id));
CREATE TABLE IF NOT EXISTS Pokemons (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, description TEXT, imgUrl VARCHAR(255));
CREATE TABLE IF NOT EXISTS Pokemon_Type (pokemon_id INT NOT NULL, type_id INT NOT NULL, PRIMARY KEY (pokemon_id, type_id));
CREATE TABLE IF NOT EXISTS User_Favorite_Pokemon (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,pokemon_id INT NOT NULL,FOREIGN KEY (user_id) REFERENCES Users(id),FOREIGN KEY (pokemon_id) REFERENCES Pokemons(id));

-- Pokemon id1
INSERT INTO Pokemons(name, description, imgUrl) values ("CHARIZARD", "Duis pellentesque tortor non enim egestas tincidunt. Sed luctus, nulla ac dignissim pharetra, nunc odio aliquet nisi, vel lacinia enim turpis mattis nisi. Aenean tellus eros, pellentesque ac sapien.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg");
-- Pokemon id2
INSERT INTO Pokemons(name, description, imgUrl) values ("CHARMELEON", "Vestibulum rhoncus tincidunt nisi, vitae dignissim felis efficitur ac. Aliquam mi purus, faucibus sit amet augue non, pellentesque aliquam mi.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg");
-- Pokemon id3
INSERT INTO Pokemons(name, description, imgUrl) values ("NINETALES", "In dignissim tortor quis ligula tincidunt dignissim. Maecenas vestibulum ligula odio, maximus elementum quam rhoncus eu.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/38.svg");

-- Type FIRE, id1
INSERT INTO Types(name) values ("FIRE");

INSERT INTO Pokemon_Type(pokemon_id, type_id) values (1, 1);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (2, 1);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (3, 1);

-- Pokemon id4
INSERT INTO Pokemons(name, description, imgUrl) values ("SQUIRTLE", "Nullam dolor purus, laoreet eget tincidunt id, porta id nisl. Etiam at mauris justo. Aenean ac nulla sit amet lorem blandit malesuada.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg");
-- Pokemon id5
INSERT INTO Pokemons(name, description, imgUrl) values ("GYARADOS", "Sed eleifend gravida neque, suscipit sagittis arcu tincidunt et. Vivamus luctus odio nec purus luctus, nec auctor mauris pretium. Sed a leo auctor, porttitor ipsum.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/130.svg");
-- Pokemon id6
INSERT INTO Pokemons(name, description, imgUrl) values ("VAPOREON", "Aenean finibus nibh tempus, vehicula dolor ornare, lacinia purus. Pellentesque suscipit, neque cursus aliquet rhoncus, nisl dui consectetur lacus.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/134.svg");

-- Type FIRE, id2
INSERT INTO Types(name) values ("WATER");

INSERT INTO Pokemon_Type(pokemon_id, type_id) values (4, 2);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (5, 2);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (6, 2);

-- Pokemon id7
INSERT INTO Pokemons(name, description, imgUrl) values ("MEWTWO", "Nullam dolor purus, laoreet eget tincidunt id, porta id nisl. Etiam at mauris justo. Aenean ac nulla sit amet lorem blandit malesuada.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg");
-- Pokemon id8
INSERT INTO Pokemons(name, description, imgUrl) values ("MEW", "Sed eleifend gravida neque, suscipit sagittis arcu tincidunt et. Vivamus luctus odio nec purus luctus, nec auctor mauris pretium. Sed a leo auctor, porttitor ipsum.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg");
-- Pokemon id9
INSERT INTO Pokemons(name, description, imgUrl) values ("ALAKAZAM", "Aenean finibus nibh tempus, vehicula dolor ornare, lacinia purus. Pellentesque suscipit, neque cursus aliquet rhoncus, nisl dui consectetur lacus.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/65.svg");
-- Pokemon id10
INSERT INTO Pokemons(name, description, imgUrl) values ("ESPEON", "Nullam dolor purus, laoreet eget tincidunt id, porta id nisl. Etiam at mauris justo. Aenean ac nulla sit amet lorem blandit malesuada.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/196.svg");
-- Pokemon id11
INSERT INTO Pokemons(name, description, imgUrl) values ("METAGROSS", "Sed eleifend gravida neque, suscipit sagittis arcu tincidunt et. Vivamus luctus odio nec purus luctus, nec auctor mauris pretium. Sed a leo auctor, porttitor ipsum.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/376.svg");
-- Pokemon id12
INSERT INTO Pokemons(name, description, imgUrl) values ("GALLADE", "Aenean finibus nibh tempus, vehicula dolor ornare, lacinia purus. Pellentesque suscipit, neque cursus aliquet rhoncus, nisl dui consectetur lacus.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/475.svg");

-- Type PSYCHIC, id3
INSERT INTO Types(name) values ("PSYCHIC");

INSERT INTO Pokemon_Type(pokemon_id, type_id) values (7, 3);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (8, 3);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (9, 3);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (10, 3);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (11, 3);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (12, 3);

-- Pokemon id13
INSERT INTO Pokemons(name, description, imgUrl) values ("MACHAMP", "Nullam dolor purus, laoreet eget tincidunt id, porta id nisl. Etiam at mauris justo. Aenean ac nulla sit amet lorem blandit malesuada.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/68.svg");
-- Pokemon id14
INSERT INTO Pokemons(name, description, imgUrl) values ("LUCARIO", "Sed eleifend gravida neque, suscipit sagittis arcu tincidunt et. Vivamus luctus odio nec purus luctus, nec auctor mauris pretium. Sed a leo auctor, porttitor ipsum.", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png");

-- Type FIGHTING, id4
INSERT INTO Types(name) values ("FIGHTING");

INSERT INTO Pokemon_Type(pokemon_id, type_id) values (13, 4);
INSERT INTO Pokemon_Type(pokemon_id, type_id) values (14, 4);

-- Insert users
INSERT INTO Users(username, password, email, token) values ("jjuarez", "foobar", "jjuarez@gmail.com", "fdsfsaf");
