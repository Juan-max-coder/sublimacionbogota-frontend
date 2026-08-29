import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

// Íconos
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FactoryIcon from "@mui/icons-material/Factory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import LayersIcon from "@mui/icons-material/Layers";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #2c3e50, #34495e, #1abc9c)",
          color: "#fff",
        },
      }}
    >
      <List>
        {/* Inicio */}
        <ListItem
          button
          component={Link}
          to="/"
          sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}
        >
          <ListItemIcon><HomeIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText
            primary="MENÚ"
            sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }}
          />
        </ListItem>

        {/* Clientes */}
        <ListItem button component={Link} to="/clientes" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><PeopleIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Clientes" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Empleados */}
        <ListItem button component={Link} to="/empleados" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><WorkIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Empleados" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Pedidos */}
        <ListItem button component={Link} to="/pedidos" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><ShoppingCartIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Pedidos" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Detalles Pedido */}
        <ListItem button component={Link} to="/detalles" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><LayersIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Detalles Pedido" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Producciones */}
        <ListItem button component={Link} to="/producciones" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><FactoryIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Producciones" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Facturas */}
        <ListItem button component={Link} to="/facturas" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><ReceiptIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Facturas" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Insumos */}
        <ListItem button component={Link} to="/insumos" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><InventoryIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Insumos" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Materiales */}
        <ListItem button component={Link} to="/materiales" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><LayersIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Materiales" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Movimientos Inventario */}
        <ListItem button component={Link} to="/movimientos" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><InventoryIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Movimientos Inventario" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Reportes */}
        <ListItem button component={Link} to="/reportes" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><AssessmentIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Reportes" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>

        {/* Tareas Producción */}
        <ListItem button component={Link} to="/tareas" sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" } }}>
          <ListItemIcon><AssignmentIcon sx={{ color: "#fff" }} /></ListItemIcon>
          <ListItemText primary="Tareas Producción" sx={{ color: "#fff", fontSize: "1.2rem", fontFamily: "cursive", fontWeight: "bold" }} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;