CREATE TABLE "clientes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clientes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"codigo_cliente" integer NOT NULL,
	CONSTRAINT "clientes_codigo_cliente_unique" UNIQUE("codigo_cliente")
);
--> statement-breakpoint
CREATE TABLE "pedido_itens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pedido_itens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pedido_id" integer NOT NULL,
	"produto" varchar(255) NOT NULL,
	"quantidade" integer NOT NULL,
	"preco_unitario" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pedidos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pedidos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"codigo_pedido" integer NOT NULL,
	"codigo_cliente" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pedidos_codigo_pedido_unique" UNIQUE("codigo_pedido")
);
--> statement-breakpoint
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_codigo_cliente_clientes_codigo_cliente_fk" FOREIGN KEY ("codigo_cliente") REFERENCES "public"."clientes"("codigo_cliente") ON DELETE no action ON UPDATE no action;