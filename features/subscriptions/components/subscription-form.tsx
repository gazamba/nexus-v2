"use client";

import React from "react";
import {
  SubscriptionFormData,
  SubscriptionType,
} from "../types/subscription-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriptionSchema } from "@/features/subscriptions/schemas/subscription-schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubscriptionFormProps {
  subscription?: SubscriptionType | null;
  loading?: boolean;
  onCreate?: (data: SubscriptionFormData) => void;
  onEdit?: (subscriptionId: string, data: SubscriptionFormData) => void;
  onCancel?: () => void;
}

export default function SubscriptionForm({
  subscription,
  loading,
  onCreate,
  onEdit,
  onCancel,
}: SubscriptionFormProps) {
  const form = useForm({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: subscription
      ? {
          name: subscription.name ?? "",
          pricing_model: subscription.pricing_model ?? "fixed",
          credit_per_period: subscription.credit_per_period ?? 0,
          price_per_credit: subscription.price_per_credit ?? 0,
          product_usage_api: subscription.product_usage_api ?? "air-direct",
          contract_length: subscription.contract_length ?? "month",
          payment_cadence: subscription.payment_cadence ?? "monthly",
          setup_fee: subscription.setup_fee ?? 0,
          prepayment_percentage: subscription.prepayment_percentage ?? 0,
          cap_amount: subscription.cap_amount ?? 0,
          average_cost: subscription.average_cost ?? 0,
        }
      : {
          name: "",
          pricing_model: "fixed",
          credit_per_period: 0,
          price_per_credit: 0,
          product_usage_api: "air-direct",
          contract_length: "month",
          payment_cadence: "monthly",
          setup_fee: 0,
          prepayment_percentage: 0,
          cap_amount: 0,
          average_cost: 0,
        },
  });

  const { handleSubmit, control } = form;

  const handleFormSubmit = (data: SubscriptionFormData) => {
    if (subscription?.id && onEdit) {
      onEdit(subscription.id, data);
    } else if (onCreate) {
      onCreate(data);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
        id="client-form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="name"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pricing_model"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pricing Model</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pricing model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="tiered">Tiered</SelectItem>
                      <SelectItem value="usage">Usage</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="credit_per_period"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit per Period</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price_per_credit"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Credit</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="product_usage_api"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Usage API</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product usage API" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air-direct">Air Direct</SelectItem>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="contract_length"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Length</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a contract length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="quarter">Quarter</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="payment_cadence"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Cadence</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment cadence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="setup_fee"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Setup Fee</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="prepayment_percentage"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prepayment Percentage</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="cap_amount"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cap Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="average_cost"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Cost</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className=""
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="">
            {loading
              ? "Creating Subscription..."
              : subscription
              ? "Update Subscription"
              : "Create Subscription"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
