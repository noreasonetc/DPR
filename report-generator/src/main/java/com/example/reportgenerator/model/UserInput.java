package com.example.reportgenerator.model;

import jakarta.persistence.*;

@Entity
public class UserInput {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double plannedHours;
    private double actualHours;
    private double hrsToPlan;
    private double plannedPieces = 0.0; // Default value
    private double actualPieces = 0.0;  // Default value
    private double piecesToPlan;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPlannedHours() {
        return plannedHours;
    }

    public void setPlannedHours(double plannedHours) {
        this.plannedHours = plannedHours;
    }

    public double getActualHours() {
        return actualHours;
    }

    public void setActualHours(double actualHours) {
        this.actualHours = actualHours;
    }

    public double getHrsToPlan() {
        return hrsToPlan;
    }

    public void setHrsToPlan(double hrsToPlan) {
        this.hrsToPlan = hrsToPlan;
    }

    public double getPlannedPieces() {
        return plannedPieces;
    }

    public void setPlannedPieces(double plannedPieces) {
        this.plannedPieces = plannedPieces;
    }

    public double getActualPieces() {
        return actualPieces;
    }

    public void setActualPieces(double actualPieces) {
        this.actualPieces = actualPieces;
    }

    public double getPiecesToPlan() {
        return piecesToPlan;
    }

    public void setPiecesToPlan(double piecesToPlan) {
        this.piecesToPlan = piecesToPlan;
    }
}