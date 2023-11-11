const nonPublicDDl =[`CREATE TABLE uniqueSchemaName.academy_building (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	short_description varchar(255) NOT NULL,
	long_description text NULL,
	logo varchar(255) NOT NULL,
	is_active bool NOT NULL DEFAULT true,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(255) NOT NULL DEFAULT ''::character varying,
	updated_by varchar(255) NOT NULL DEFAULT ''::character varying,
	CONSTRAINT academy_building_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX academy_building_name ON uniqueSchemaName.academy_building USING btree (name);`];
module.exports={nonPublicDDl}